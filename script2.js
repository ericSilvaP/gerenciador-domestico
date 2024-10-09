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
        { nome: 'Lavar banheiro', tempo: document.getElementById('tasks4').value, dias: getSelectedDays('task4') }
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
