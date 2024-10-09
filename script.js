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