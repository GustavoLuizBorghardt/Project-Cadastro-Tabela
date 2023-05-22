$(function () {
    var operacoes = "A"
    var indice_selecionado = -1;
    tbClientes = localStorage.getItem("tbClientes");

    tbClientes = JSON.parse(tbClientes);

    if (tbClientes == null)
        tbClientes = [];
    function Adicionar() {
        var cli = GetCliente("Codigo", $("#txtCodigo").val());
        if (cli != null) {
            alert("Código já cadastrado!");
            return;
            adc.play();
        }
    
        var cliente = JSON.stringify({
            Codigo: $("#txtCodigo").val(),
            Nome: $("#txtNome").val(),
            Telefone: $("#txtFone").val(),
            Email: $("#txtEmail").val()
        });
        tbClientes.push(cliente);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Cadastro Efetuado com sucesso!");
        return true;
    }


    function Editar() {
        tbClientes[indice_selecionado] = JSON.stringify({
            Codigo: $("#txtCodigo").val(),
            Nome: $("#txtNome").val(),
            Telefone: $("#txtFone").val(),
            Email: $("#txtEmail").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Informações alteradas com sucesso!")
        operacoes = "A";
        return true;
    }


    function Listar() {
        $("#tabela").html("");
        $("#tabela").html(
            "<thead>" +
            "	<tr>" +
            "<th></th>" +
            "	<th>Código</th>" +
            "	<th>Descrição</th>" +
            "	<th>Quantidade</th>" +
            "	<th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );

        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            $("#tabela").append("<tr>" +
                "	<td></td>" +
                "	<td>" + cli.Codigo + "</td>" +
                "	<td>" + cli.Nome + "</td>" +
                "	<td>" + cli.Telefone + "</td>" +
                "	<td><img src='img/comprado.png' alt='" + i +
                "' class='btnComprado')/><img src='img/sem_estoque.png' alt='" + i +
                "' class='btnSem-estoque'/><img src='img/editar.png' alt='" + i + "' class='btnEditar' width='29'/></td>" +
                "</tr>");

        }
    }



    function Comprado() {
        document.getElementById("tabela").style.backgroundColor = "#3CB371";
    }
    function Semestoque() {
        document.getElementById("tabela").style.backgroundColor = "#FFA07A";
    }

    function GetCliente(propriedade, valor) {
        var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
    }



    Listar();
    $("#frmCadastro").bind("submit", function () {
        if (operacoes == "A")
            return Adicionar();
        else
            return Editar();
    });

    $(".btnEditar").bind("click", function () {
        operacoes = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#txtCodigo").val(cli.Codigo);
        $("#txtNome").val(cli.Nome);
        $("#txtFone").val(cli.Telefone);
        $("#txtEmail").val(cli.Email);
        $("#txtCodigo").attr("readonly", "readonly");
        $("#txtNome").focus();
        edit.play();
    });

    $(".btnComprado").bind("click", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        comp.play();
        Comprado();
        Listar();
    });
    $(".btnSem-estoque").bind("click", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        se.play();
        Semestoque();
        Listar();
    });
    

    var edit = new Audio();
    var comp = new Audio();
    var adc = new Audio();
    var se = new Audio();

    edit.src = 'som/editar.mp3';
    comp.src = 'som/comprado.mp3';
    adc.src = 'som/Adicionar.mp3';
    se.src = 'som/sem_estoque.mp3';


});

