export function validateInput(data) {
    return Array.isArray(data) && data.every(item => typeof item === 'string');
  }
  
  export function processData(data) {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercase = alphabets
      .filter(char => char.length === 1 && char === char.toLowerCase())
      .sort((a, b) => b.localeCompare(a))[0];
  
    return {
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      is_prime_found: numbers.some(num => isPrime(parseInt(num))),
    };
  }
  
  export function validateFile(file_b64) {
    if (!file_b64) {
      return { file_valid: false };
    }
  
    try {
      const buffer = Buffer.from(file_b64, 'base64');
      const fileSize = buffer.length / 1024; 
  
      
      const mimeType =
        buffer[0] === 0xff && buffer[1] === 0xd8 ? 'image/jpeg' :
        buffer[0] === 0x89 && buffer[1] === 0x50 ? 'image/png' :
        buffer[0] === 0x25 && buffer[1] === 0x50 ? 'application/pdf' :
        buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 ? 'image/gif' :
        'application/octet-stream'; 
  
      return {
        file_valid: true,
        file_mime_type: mimeType,
        file_size_kb: fileSize.toFixed(2),
      };
    } catch (error) {
      console.error('Error validating file:', error);
      return { file_valid: false };
    }
  }
  
  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  