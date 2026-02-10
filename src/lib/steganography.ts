/**
 * KaizenBreach LSB Steganography Logic
 * Implements Least Significant Bit encoding for covert message hiding.
 */

// Helper: Get max bytes
export const calculateCapacity = (width: number, height: number): number => {
  // 3 channels (RGB), 8 bits per byte. Max bytes = (pixels * 3) / 8
  // We subtract a buffer for null termination
  return Math.floor((width * height * 3) / 8) - 100;
};

// Encode Function
export const encodeMessage = (
  image: HTMLImageElement,
  message: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject("Canvas context not available");
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert message to binary string + null terminator
    let binaryMessage = "";
    for (let i = 0; i < message.length; i++) {
      let binaryChar = message.charCodeAt(i).toString(2).padStart(8, "0");
      binaryMessage += binaryChar;
    }
    // Add null terminator (00000000) to signal end of message
    binaryMessage += "00000000";

    if (binaryMessage.length > data.length * 0.75) {
      reject("Message too long for this image.");
      return;
    }

    let dataIndex = 0;
    
    // Embed bits
    for (let i = 0; i < binaryMessage.length; i++) {
      // Skip Alpha channel (every 4th byte: 3, 7, 11...)
      if ((dataIndex + 1) % 4 === 0) {
        dataIndex++;
      }

      const bit = parseInt(binaryMessage[i]);
      const currentByte = data[dataIndex];
      
      // Clear LSB and add new bit
      // (currentByte & 254) zeroes the last bit. | bit adds the new one.
      data[dataIndex] = (currentByte & 0xFE) | bit;
      
      dataIndex++;
    }

    ctx.putImageData(imageData, 0, 0);
    
    // Return as PNG to prevent compression artifacts destroying data
    resolve(canvas.toDataURL("image/png"));
  });
};

// Decode Function
export const decodeMessage = (image: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject("Canvas context not available");
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let binaryMessage = "";
    let currentByteIndex = 0;
    
    // Extract binary data until null terminator is found
    while (currentByteIndex < data.length) {
      // Skip Alpha channel
      if ((currentByteIndex + 1) % 4 === 0) {
        currentByteIndex++;
        continue;
      }

      // Extract LSB
      const bit = data[currentByteIndex] & 1;
      binaryMessage += bit;
      currentByteIndex++;

      // Check every 8 bits (1 char) for null terminator
      if (binaryMessage.length % 8 === 0) {
        const lastCharBits = binaryMessage.slice(-8);
        if (lastCharBits === "00000000") {
          break; // Stop decoding
        }
      }
    }

    // Convert binary to string
    let decodedMessage = "";
    const cleanBinary = binaryMessage.slice(0, -8); // Remove terminator

    for (let i = 0; i < cleanBinary.length; i += 8) {
      const byte = cleanBinary.slice(i, i + 8);
      decodedMessage += String.fromCharCode(parseInt(byte, 2));
    }

    // Filter printable characters only (basic sanity check)
    // This regex allows standard ASCII and some extended chars
    if (/^[\x20-\x7E\n\r\t]*$/.test(decodedMessage)) {
        resolve(decodedMessage);
    } else {
        // If it looks like garbage, it might not be a stego image
        resolve(decodedMessage); // Return anyway, let UI handle display
    }
  });
};