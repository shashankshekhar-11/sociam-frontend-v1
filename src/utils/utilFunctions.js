export const getTimeDifference = (postDate) => {
	const datePosted = new Date(postDate);
	const timeNow = new Date();
	const millisec = Math.floor(timeNow - datePosted);
	const sec = Math.floor(millisec / 1000);
	if (sec > 59) {
		const min = Math.floor(sec / 60);
		if (min > 59) {
			const hours = Math.floor(min / 60);
			if (hours > 23) {
				const days = Math.floor(hours / 24);
				if (days > 30) {
					const months = Math.floor(days / 30);
					if (months > 11) {
						return datePosted.toLocaleDateString("en-us", {
							day: "numeric",
							year: "numeric",
							month: "short",
						});
					} else {
						return `${months}mo ago`;
					}
				} else {
					return `${days}d ago`;
				}
			} else {
				return `${hours}h ago`;
			}
		} else {
			return `${min}m ago`;
		}
	} else {
		return `${sec}s ago`;
	}
};

export const checkUserInteraction = (arr, currentUserId) => {
    return arr?.some((userId) => userId === currentUserId);
};


export const checkIfBookmarked = (bookmarks, post) => {
	return bookmarks?.includes(post?._id);
};

