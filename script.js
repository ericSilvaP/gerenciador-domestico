// Obtém todas as linhas da tabela
const rows = document.querySelectorAll('tbody td');

// Adiciona um evento de clique em cada linha
rows.forEach(row => {
     row.addEventListener('click', function() {
         // Remove a classe 'selected' de todas as linhas
         rows.forEach(r => r.classList.remove('selected'));
         // Adiciona a classe 'selected' à linha clicada
         this.classList.add('selected');
     });
 });


 document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enviar').addEventListener('click', async function() {
        const tarefas = [
            { nome: 'Varrer a casa', tempo: document.getElementById('tasks1').value },
            { nome: 'Lavar louça', tempo: document.getElementById('tasks2').value },
            { nome: 'Cozinhar', tempo: document.getElementById('tasks3').value },
            { nome: 'Lavar banheiro', tempo: document.getElementById('tasks4').value }
        ];

        let resultado = tarefas.map(tarefa => `${tarefa.nome}: ${tarefa.tempo} minutos`).join('\n');

        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'tarefas_domesticas.txt',
                types: [
                    {
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] },
                    },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(resultado);
            await writable.close();

            alert('Tarefas salvas com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar o arquivo:', err);
        }
    });
});