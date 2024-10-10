function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

document.getElementById('enviar').addEventListener('click', function() {
    const tarefas = [
        { nome: 'Varrer a casa', tempo: document.getElementById('tasks1').value, dias: getSelectedDays('task1') },
        { nome: 'Lavar louça', tempo: document.getElementById('tasks2').value, dias: getSelectedDays('task2') },
        { nome: 'Cozinhar', tempo: document.getElementById('tasks3').value, dias: getSelectedDays('task3') },
        { nome: 'Lavar banheiro', tempo: document.getElementById('tasks4').value, dias: getSelectedDays('task4') },
        { nome: 'Jogar o lixo', tempo: document.getElementById('tasks5').value, dias: getSelectedDays('task5') },
        { nome: 'Lavar roupa', tempo: document.getElementById('tasks6').value, dias: getSelectedDays('task6') },
        { nome: 'Limpar quintal', tempo: document.getElementById('tasks7').value, dias: getSelectedDays('task7') }
    ];

    let resultado = tarefas.map(tarefa => {
        const dias = tarefa.dias.length ? tarefa.dias.join(', ') : 'Nenhum dia selecionado';
        return `${tarefa.nome}: ${tarefa.tempo} minutos; Dias: ${dias}`;
    }).join('\n');

    // Usar Blob para download
    downloadFile(resultado, 'tarefas_domesticas.txt', 'text/plain');
});

// Função para obter os dias selecionados da nova interface de seleção múltipla
function getSelectedDays(taskId) {
    const checkboxes = document.querySelectorAll(`.multi-select[data-task="${taskId}"] input[type="checkbox"]`);
    return Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
}

function toggleDropdown(taskId) {
    const options = document.querySelector(`.multi-select[data-task="${taskId}"] .options`);
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function updateSelectedDays(taskId) {
    const checkboxes = document.querySelectorAll(`.multi-select[data-task="${taskId}"] input[type="checkbox"]`);
    const selectedDays = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedText = selectedDays.length > 0 ? selectedDays.join(', ') : 'Selecione os dias';
    document.querySelector(`.multi-select[data-task="${taskId}"] .selected`).innerText = selectedText;

    // Altera a classe do select-box com base na seleção
    const selectBox = document.querySelector(`.multi-select[data-task="${taskId}"] .select-box`);
    if (selectedDays.length > 0) {
        selectBox.classList.add('selected-day'); // Classe que indica que dias estão selecionados
    } else {
        selectBox.classList.remove('selected-day');
    }
}

// Adicionando evento de clique para cada checkbox
document.querySelectorAll('.multi-select input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
        updateSelectedDays(this.closest('.multi-select').dataset.task);
    });
});
