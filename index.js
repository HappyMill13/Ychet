const tickets = [
    { title: 'Проектор не включается ', room: '203 ', category: 'Оборудование ', done: false },
    { title: 'Не закрывается окно ', room: '105 ', category: 'Аудитория ', done: false },
    { title: 'В коридоре не горит свет ', room: 'Коридор, 2-й этаж ', category: 'Другое ', done: true }
];
const titleInput = document.getElementById('titleInput');
const roomInput = document.getElementById('roomInput');
const categorySelect = document.getElementById('categorySelect');
const addButton = document.getElementById('addButton');
const message = document.getElementById('message');
const ticketList = document.getElementById('ticketList');

function renderTickets() {
    ticketList.innerHTML = '';

    tickets.forEach((ticket, index) => {
        const item = document.createElement('li');

        const title = document.createElement('span');
        title.className = 'ticket-title';
        title.textContent = ticket.title;

        const info = document.createElement('span');
        info.textContent = `${ticket.room} · ${ticket.category}`;

        const status = document.createElement('span');
        status.className = 'ticket-status ' + (ticket.done ? 'status-done' : 'status-open');
        status.textContent = ticket.done ? 'Выполнена' : 'Открыта';

        const actions = document.createElement('div');
        actions.className = 'ticket-actions';

        if (!ticket.done) {
            const doneButton = document.createElement('button');
            doneButton.className = 'btn-done';
            doneButton.textContent = 'Выполнить';
            doneButton.addEventListener('click', () => {
                ticket.done = true;
                renderTickets();
            });
            actions.append(doneButton);
        }

        const removeButton = document.createElement('button');
        removeButton.className = 'btn-remove';
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
            tickets.splice(index, 1);
            renderTickets();
        });
        actions.append(removeButton);

        item.append(title, info, status, actions);
        ticketList.append(item);
    });
}

renderTickets();

addButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const room = roomInput.value.trim();
    const category = categorySelect.value;

    const titleEmpty = title.trim() === '';
    const roomEmpty = room.trim() === '';
    const categoryEmpty = category === '';

    if (titleEmpty || roomEmpty || categoryEmpty) {
        message.textContent = 'Заполните все поля и выберите категорию';
        return;
    }

    const newTicket = {
        title: title.trim(),
        room: room.trim(),
        category: category,
        done: false
    };

    tickets.push(newTicket);

    titleInput.value = '';
    roomInput.value = '';
    categorySelect.value = '';

    message.textContent = `Заявка «${newTicket.title}» добавлена`;

    renderTickets();
});
