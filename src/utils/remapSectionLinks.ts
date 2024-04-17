const getLinkTitle = (data: object) => {
	if (typeof(data) !== 'object') return;

  return (data?.fields?.inPageNavTitle || data?.fields?.title || data?.fields?.headline?.fields?.inPageNavTitle || data?.fields?.headline?.fields?.title);
}

export const remapSectionLinks = (data: object) => {
	if (typeof(data) !== 'object') return;

	let newData;

	if (Array.isArray(data)) {
		newData = [];
		data.map((item) => {
		  	newData.push({
		    	id: item?.fields?.sectionId ? item?.fields?.sectionId : null,
		    	title: getLinkTitle(item),
		  	});
		  	return newData;
		});
	} else {
		newData = {
		  	id: data?.fields?.sectionId ? data?.fields?.sectionId : null,
		  	title: getLinkTitle(data),
		};
	}

	return newData;
}