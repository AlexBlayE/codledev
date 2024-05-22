const listItems = document.querySelectorAll("#search-filters li");

listItems.forEach((item, index) => {
	item.addEventListener("mouseover", () => {
		item.style.height = "2.5rem";
		if (index > 0) {
			listItems[index - 1].style.height = "2.5rem";
		}
	});

	item.addEventListener("mouseout", () => {
		item.style.height = "";
		if (index > 0) {
			listItems[index - 1].style.height = "";
		}
	});
});


document.getElementById("search-btn").addEventListener("mouseout", () => {
	// aaaa
});
