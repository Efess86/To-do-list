'use strict';

const input = document.querySelector('.header__input'),
	error = document.querySelector('.error'),
	addBtn = document.querySelector('.header__btn'),
	items = document.querySelector('.items');

input.focus();

let generateId = () => { // not my code
	let generateRandom = () => {
		return Math.floor((Math.random()) * 0x100000).toString(16).substring(1);
	};
	return generateRandom() + '-' + generateRandom();
};

function addInputValue() {
	if (!input.value) {
		error.classList.add('error__active');
		setTimeout(() => {
			error.classList.remove('error__active');
			input.focus();
		}, 2000);
	} else {
		let uniqueId = generateId();
		let insertHtml = `<div class="item" draggable="true">
		<div class="item__drag">
			<span class="item__drag-span"></span>
		</div>
		<input type="checkbox" name="item-content" id="${uniqueId}" class="item__check">
		<label for="${uniqueId}" class="item__text">${input.value}</label>
		<div class="item__del"></div>
	</div>`;
		input.value = '';
		items.innerHTML += insertHtml;
	}
}

// not my code below for drag and drop items
// https://www.youtube.com/watch?v=jfYWwQrtzzY&list=PL0OXCpgBPKwJeDt8hggiPKyn8HHLRF4Qb&index=1

function dragItem() {
	const draggables = document.querySelectorAll('.item'),
		containers = document.querySelectorAll('.items');


	draggables.forEach(draggable => {
		draggable.addEventListener('dragstart', () => {
			draggable.classList.add('dragging');
		});
		draggable.addEventListener('dragend', () => {
			draggable.classList.remove('dragging');
		});
	});

	containers.forEach(container => {
		container.addEventListener('dragover', e => {
			e.preventDefault();
			const afterElement = getDragAfterElement(container, e.clientY);
			const draggable = document.querySelector('.dragging');
			if (afterElement == null) {
				container.appendChild(draggable);
			} else {
				container.insertBefore(draggable, afterElement);
			}
		});
	});

	function getDragAfterElement(container, y) {
		const draggleElements = [...container.querySelectorAll('.item:not(.dragging)')];

		return draggleElements.reduce((closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			// console.log(offset);
			if (offset < 0 && offset > closest.offset) {
				return {
					offset: offset,
					element: child
				};
			} else {
				return closest;
			}
		}, {
			offset: Number.NEGATIVE_INFINITY
		}).element;
	}
}

function touchDragItem() {
	const draggables = document.querySelectorAll('.item'),
		containers = document.querySelectorAll('.items');


	draggables.forEach(draggable => {
		draggable.addEventListener('touchstart', () => {
			draggable.classList.add('dragging');
		});
		draggable.addEventListener('touchend', () => {
			draggable.classList.remove('dragging');
		});
	});

	containers.forEach(container => {
		container.addEventListener('dragover', e => {
			e.preventDefault();
			const afterElement = getDragAfterElement(container, e.clientY);
			const draggable = document.querySelector('.dragging');
			if (afterElement == null) {
				container.appendChild(draggable);
			} else {
				container.insertBefore(draggable, afterElement);
			}
		});
	});

	function getDragAfterElement(container, y) {
		const draggleElements = [...container.querySelectorAll('.item:not(.dragging)')];

		return draggleElements.reduce((closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			// console.log(offset);
			if (offset < 0 && offset > closest.offset) {
				return {
					offset: offset,
					element: child
				};
			} else {
				return closest;
			}
		}, {
			offset: Number.NEGATIVE_INFINITY
		}).element;
	}
}

function deleteItem() {
	items.addEventListener('click', (e) => { // delete btn
		if (e.target && e.target.matches('.items .item .item__del')) {
			e.target.parentElement.remove();
		}
	});
}

input.addEventListener('keyup', (e) => {
	if (e.code == 'Enter' || e.code == 'NumpadEnter') {
		addInputValue();
		dragItem();
		touchDragItem();
		deleteItem();


	}
});

addBtn.addEventListener('click', () => {
	addInputValue();
	dragItem();
	touchDragItem();
	deleteItem();
});