import { getCookie } from "./utils.js";

let page = 0;
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const leftBtn = document.getElementById("left");
const middleBtn = document.getElementById("middle");
const rightBtn = document.getElementById("right");
const firstBtn = document.getElementById("first");
const lastBtn = document.getElementById("last");

document.addEventListener("DOMContentLoaded", getUsers);

async function getUsers() {
	if (page) {
		if (typeof page === "undefined") {
			page = 0;
		}
	}
	try {
		const res = await fetch("/api/user/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
			body: JSON.stringify({ page: page })
		});
		const data = await res.json();
		console.log(data.users);
		const itemList = document.getElementById("item-list");
		if (res.ok) {
			if (data.users.length < 1) {
				itemList.innerHTML = page + 1;
			} else {
				itemList.innerHTML = "";
				data.users.forEach((user, index) => {
					const row = document.createElement("li");
					row.innerHTML = `
					<div class="item-info">
						<span>${user.name}</span>
						<span>${user.email}</span>
						` + (user.is_admin ? "<span>Admin</span>" : "<span>User</span>") + `
					</div>
					<div class="item-actions">
                        <a href="/admin/user/${index}"><button class="edit">Actions</button></a> 
                    </div>
					`;
					row.classList.add("item");
					itemList.appendChild(row);
				});
			}
		}
	} catch (error) {
		console.error("Error:", error);
	}
}



let pageCount;
try {
	const res = await fetch("/api/user/count", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + getCookie("auth")
		},
	});
	const data = await res.json();
	if (res.ok) {
		if (data.count < 1) {
			pageCount = 1;
		} else {
			if (data.count % 10 === 0) {
				pageCount = data.count / 10;
			} else {
				pageCount = Math.floor(data.count / 10) + 1;
			}
		}
		if (pageCount < 2) {
			middleBtn.setAttribute("disabled", true);
			rightBtn.setAttribute("disabled", true);
			nextBtn.setAttribute("disabled", true);
			lastBtn.setAttribute("disabled", true);
		}
	}
} catch (error) {
	console.error("Error:", error);
}

// pagination

prevBtn.addEventListener("click", () => {
	if (page > 1) {
		page--;
		getUsers(page);
		leftBtn.innerText = page;
		middleBtn.innerText = page + 1;
		rightBtn.innerText = page + 2;
		nextBtn.removeAttribute("disabled");
		if (page < pageCount - 1) {
			rightBtn.removeAttribute("disabled");
			nextBtn.removeAttribute("disabled");
			lastBtn.removeAttribute("disabled");
		}
	} else {
		page--;
		getUsers(page);
		prevBtn.setAttribute("disabled", true);
		leftBtn.innerText = page + 1;
		middleBtn.innerText = page + 2;
		rightBtn.innerText = page + 3;
		leftBtn.setAttribute("disabled", true);
		middleBtn.removeAttribute("disabled");
		firstBtn.setAttribute("disabled", true);
	}
	console.log(page + 1);
});

nextBtn.addEventListener("click", () => {
	if (page < pageCount - 1) {
		page++;
		getUsers(page);
		leftBtn.innerText = page;
		leftBtn.removeAttribute("disabled");
		middleBtn.innerText = page + 1;
		rightBtn.innerText = page + 2;
		prevBtn.removeAttribute("disabled");
		firstBtn.removeAttribute("disabled");
		middleBtn.setAttribute("disabled", true);
		if (page === pageCount - 1) {
			nextBtn.setAttribute("disabled", true);
			rightBtn.setAttribute("disabled", true);
			lastBtn.setAttribute("disabled", true);
		} else {
			nextBtn.removeAttribute("disabled");
			rightBtn.removeAttribute("disabled");
			lastBtn.removeAttribute("disabled");
		}
	}
});

firstBtn.addEventListener("click", () => {
	page = 0;
	getUsers(page);
	prevBtn.setAttribute("disabled", true);
	firstBtn.setAttribute("disabled", true);
	leftBtn.setAttribute("disabled", true);
	middleBtn.removeAttribute("disabled");
	leftBtn.innerText = page + 1;
	middleBtn.innerText = page + 2;
	rightBtn.innerText = page + 3;
	if (page < pageCount - 1) {
		rightBtn.removeAttribute("disabled");
		nextBtn.removeAttribute("disabled");
		lastBtn.removeAttribute("disabled");
	}
});

lastBtn.addEventListener("click", () => {
	page = pageCount - 1;
	getUsers(page);
	nextBtn.setAttribute("disabled", true);
	lastBtn.setAttribute("disabled", true);
	prevBtn.removeAttribute("disabled");
	firstBtn.removeAttribute("disabled");
	leftBtn.innerText = page;
	middleBtn.innerText = page + 1;
	rightBtn.innerText = page + 2;
	leftBtn.removeAttribute("disabled");
	middleBtn.setAttribute("disabled", true);
	rightBtn.setAttribute("disabled", true);
});

leftBtn.addEventListener("click", () => {
	page--;
	getUsers(page);
	if (page === 0) {
		leftBtn.setAttribute("disabled", true);
		middleBtn.removeAttribute("disabled");
		firstBtn.setAttribute("disabled", true);
		prevBtn.setAttribute("disabled", true);
	} else {
		leftBtn.innerText = page;
		middleBtn.innerText = page + 1;
		rightBtn.innerText = page + 2;
	}
	if (page < pageCount - 1) {
		rightBtn.removeAttribute("disabled");
		nextBtn.removeAttribute("disabled");
		lastBtn.removeAttribute("disabled");
	}
});

middleBtn.addEventListener("click", () => {
	if (page === 0) {
		page++;
		getUsers(page);
		leftBtn.innerText = page;
		middleBtn.innerText = page + 1;
		rightBtn.innerText = page + 2;
		middleBtn.setAttribute("disabled", true);
		leftBtn.removeAttribute("disabled");
		prevBtn.removeAttribute("disabled");
		firstBtn.removeAttribute("disabled");
		if (page === pageCount - 1) {
			rightBtn.setAttribute("disabled", true);
			nextBtn.setAttribute("disabled", true);
			lastBtn.setAttribute("disabled", true);
		}
	}
});

rightBtn.addEventListener("click", () => {
	if (page < pageCount - 1) {
		if (page === 0) {
			page++;
			page++;
			getUsers(page);
			leftBtn.innerText = page;
			middleBtn.innerText = page + 1;
			rightBtn.innerText = page + 2;
			if (page === pageCount - 1) {
				rightBtn.setAttribute("disabled", true);
				nextBtn.setAttribute("disabled", true);
				lastBtn.setAttribute("disabled", true);
			} else {
				rightBtn.removeAttribute("disabled");
			}
			leftBtn.removeAttribute("disabled");
			middleBtn.setAttribute("disabled", true);
			prevBtn.removeAttribute("disabled");
			firstBtn.removeAttribute("disabled");
		} else {
			page++;
			getUsers(page);
			leftBtn.innerText = page;
			middleBtn.innerText = page + 1;
			rightBtn.innerText = page + 2;
			if (page === pageCount - 1) {
				rightBtn.setAttribute("disabled", true);
				nextBtn.setAttribute("disabled", true);
				lastBtn.setAttribute("disabled", true);
			} else {
				rightBtn.removeAttribute("disabled");
			}
			leftBtn.removeAttribute("disabled");
		}
	}
});
