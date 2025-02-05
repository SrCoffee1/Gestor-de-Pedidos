// Dados iniciais de pedidos
let pedidos = [
    { id: 1, cliente: 'Carlos Silva', status: 'Pendente', total: 35.50 },
    { id: 2, cliente: 'Ana Oliveira', status: 'Pendente', total: 45.00 },
    { id: 1, cliente: 'João Borges', status: 'Pendente', total: 14.50 },
    { id: 3, cliente: 'João Santos', status: 'Pendente', total: 28.75 }
];

// Função para atualizar a lista de pedidos na interface
function atualizarListaPedidos() {
    // Limpar as listas
    document.getElementById('lista-pedidos-pendente').innerHTML = '';
    document.getElementById('lista-pedidos-em-preparo').innerHTML = '';
    document.getElementById('lista-pedidos-pronto').innerHTML = '';
    document.getElementById('lista-pedidos-cancelado').innerHTML = '';

    // Filtrar os pedidos por status
    pedidos.forEach(pedido => {
        const pedidoElement = document.createElement('div');
        pedidoElement.classList.add('pedido');

        // Botões dinâmicos com base no status
        let botaoAceitar = '';
        let botaoPronto = '';
        let botaoCancelar = '';

        // Se o pedido estiver "Pendente", mostrar os botões Aceitar e Cancelar
        if (pedido.status === 'Pendente') {
            botaoAceitar = `<button onclick="aceitarPedido(${pedido.id})">Aceitar Pedido</button>`;
            botaoCancelar = `<button class="cancelar" onclick="cancelarPedido(${pedido.id})">Cancelar Pedido</button>`;
        } else if (pedido.status === 'Em preparo') {
            botaoPronto = `<button onclick="finalizarPedido(${pedido.id})">Pronto</button>`;
            botaoCancelar = `<button class="cancelar" onclick="cancelarPedido(${pedido.id})">Cancelar Pedido</button>`;
        } else if (pedido.status === 'Pronto') {
            // Quando o pedido estiver "Pronto", mostrar o botão Cancelar
            botaoCancelar = `<button class="cancelar" onclick="cancelarPedido(${pedido.id})">Cancelar Pedido</button>`;
        }

        // Não mostrar o botão Cancelar quando o pedido for "Cancelado"
        if (pedido.status === 'Cancelado') {
            botaoCancelar = ''; // Remove o botão de cancelar
        }

        pedidoElement.innerHTML = `
            <h3>${pedido.cliente}</h3>
            <p>Status: <span id="status-${pedido.id}">${pedido.status}</span></p>
            <p>Total: R$ ${pedido.total.toFixed(2)}</p>
            ${botaoAceitar}
            ${botaoPronto}
            ${botaoCancelar}
        `;

        // Adiciona o pedido na aba correspondente
        if (pedido.status === 'Pendente') {
            document.getElementById('lista-pedidos-pendente').appendChild(pedidoElement);
        } else if (pedido.status === 'Em preparo') {
            document.getElementById('lista-pedidos-em-preparo').appendChild(pedidoElement);
        } else if (pedido.status === 'Pronto') {
            document.getElementById('lista-pedidos-pronto').appendChild(pedidoElement);
        } else if (pedido.status === 'Cancelado') {
            document.getElementById('lista-pedidos-cancelado').appendChild(pedidoElement);
        }
    });

    // Atualizar o resumo de vendas
    atualizarResumoVendas();
}

// Função para aceitar um pedido
function aceitarPedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    pedido.status = 'Em preparo'; // Atualiza o status para "Em preparo"
    atualizarListaPedidos();
}

// Função para finalizar um pedido
function finalizarPedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    pedido.status = 'Pronto'; // Atualiza o status para "Pronto"
    atualizarListaPedidos();
}

// Função para cancelar um pedido
function cancelarPedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    pedido.status = 'Cancelado'; // Atualiza o status para "Cancelado"
    atualizarListaPedidos();
}

// Função para atualizar o resumo de vendas
function atualizarResumoVendas() {
    const vendasTotal = pedidos.filter(pedido => pedido.status === 'Pronto')
                               .reduce((total, pedido) => total + pedido.total, 0);
    const vendasTotalElement = document.getElementById('vendas-total');
    vendasTotalElement.textContent = `Vendas Totais: R$ ${vendasTotal.toFixed(2)}`;
}

// Função para mostrar os pedidos por status nas abas
function mostrarPedidos(status) {
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    document.getElementById(status).classList.add('active');
}

// Inicializar a lista de pedidos e exibir a aba de "Pendente"
document.addEventListener('DOMContentLoaded', () => {
    mostrarPedidos('pendente');  // Exibe a aba de "Pendente" inicialmente
    atualizarListaPedidos();  // Atualiza a lista de pedidos
});


// Função para abrir a navbar do chat
document.getElementById('abrir-chat-btn').addEventListener('click', function() {
    document.getElementById('chat-navbar').style.width = '300px';
});

// Função para fechar a navbar do chat
document.getElementById('fechar-chat-btn').addEventListener('click', function() {
    document.getElementById('chat-navbar').style.width = '0';
});

// Função para enviar uma mensagem
document.getElementById('enviar-msg').addEventListener('click', function() {
    const mensagem = document.getElementById('mensagem').value;
    if (mensagem) {
        const novoMensagem = document.createElement('p');
        novoMensagem.textContent = `Você: ${mensagem}`;
        document.getElementById('chat-messages').appendChild(novoMensagem);
        document.getElementById('mensagem').value = ''; // Limpar o campo de mensagem
    }
});