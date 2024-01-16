import req from "@/utils/req"
import crypto from "crypto";

// regex to pull the public id from cloudinary url
const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
/**
 * Retrieves the public ID from a Cloudinary URL.
 *
 * @param {string} url - The Cloudinary URL.
 * @returns {string|null} - The public ID extracted from the URL, or null if not found.
 */
const getPublicIdFromUrl = (url) => {
    const match = url.match(regex);
    return match ? match[1] : null;
};

/**
 * Generates a SHA-1 hash for the given data.
 *
 * @param {string} data - The data to be hashed.
 * @returns {string} - The SHA-1 hash.
 */
const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

/**
 * Generates a Cloudinary signature for authentication.
 *
 * @param {string} publicId - The public ID of the resource.
 * @param {number} timestamp - The timestamp for the signature.
 * @returns {string} - The generated Cloudinary signature.
 */
const generateSignature = (publicId, timestamp) => {
    return `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_SECRET}`;
};

/**
 * Check if the given file is a video based on its MIME type.
 *
 * @param {File} file - The file object to be checked.
 * @returns {boolean} - True if the file is a video, false otherwise.
 */
const isVideoFile = (file) => {
    // Define supported video MIME types
    const supportedVideoTypes = ['video/mp4', 'video/mpeg', 'video/webm'];

    // Check if the file type is in the list of supported video types
    return supportedVideoTypes.includes(file.type);
};

/**
 * Uploads a resource to Cloudinary.
 *
 * @param {FormData} formData - The form data containing the resource to upload.
 * @returns {Promise} - A promise that resolves to the Cloudinary API response data.
 */
export const uploadResource = async (resource) => {
    try {
        resource = resource[0]
        const isVideo = isVideoFile(resource)
        const formData = new FormData();
        formData.append('file', resource);
        formData.append('upload_preset', 'zwb3ulj9');
        const response = await req({
            uri: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/${isVideo ? 'video' : 'image'}/upload`,
            method: 'POST',
            withCredentials: false,
            body: formData
        });
        return response.secure_url;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Deletes a resource from Cloudinary.
 *
 * @param {string} url - The Cloudinary URL of the resource to be deleted.
 * @returns {Promise} - A promise that resolves to the Cloudinary API response data.
 */
export const deleteResource = async (url) => {
    try {
        const timestamp = new Date().getTime();
        const publicId = getPublicIdFromUrl(url)
        const signature = generateSHA1(generateSignature(publicId, timestamp));
        const videoExtensions = ['.mp4', '.webm', '.mpeg'];
        const isVideo = videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
        const response = await req({
            uri: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/${isVideo ? 'video' : 'image'}/destroy`,
            method: 'POST',
            withCredentials: false,
            body: {
                public_id: publicId,
                signature: signature,
                api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
                timestamp: timestamp,
            }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}
