import Image from 'next/image';

/**
 * Component for rendering a resource based on its URL, supporting both video and image formats.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.url - The URL of the resource.
 * @param {string} props.className - The CSS class to be applied to the container div.
 * @returns {JSX.Element} - The rendered component.
 */
export default function Resource({ url, className }) {
    /**
     * Array of video file extensions to determine if the resource is a video.
     *
     * @type {string[]}
     */
    const videoExtensions = ['.mp4', '.webm', '.mpeg'];

    /**
     * Check if the resource is a video based on its file extension.
     *
     * @type {boolean}
     */
    const isVideo = url && videoExtensions.some(ext => url.toLowerCase().endsWith(ext));

    return (
        <div className={className}>
            {isVideo ? (
                /**
                 * Render a video element for video resources.
                 */
                <video controls className='w-full h-full'>
                    <source src={url} type={`video/${url.split('.').pop()}`} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                /**
                 * Render an Image component for image resources.
                 */
                <Image src={url} alt="Resource" width="300" height="200" className='w-full h-full' />
            )}
        </div>
    );
}

