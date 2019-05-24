
var app = {
    // Application Constructor
    initialize: function() {
        
        this.bindEvents();
        carrega();
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('load', carrega);
        

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        function carrega(){
            document.getElementById('field-name').addEventListener('blur', leave);
            document.getElementById('field-pass').addEventListener('blur', leave);
            document.getElementById('field-mail').addEventListener('blur', leave);   
        }
        function leave(){
            if(this.value != ''){
                this.offsetParent.className += " ativo";
            }else{
                this.offsetParent.className = 'box';
            }
        }
        function inputSHOW(_show){
            if(_show){
                document.getElementById('field-name').offsetParent.className += " ativo";
                document.getElementById('field-pass').offsetParent.className += " ativo";
                document.getElementById('field-mail').offsetParent.className += " ativo";
                document.getElementById('btn-deletar').style.display = 'block';
            }else{        
                document.getElementById('field-name').offsetParent.className = 'box';
                document.getElementById('field-pass').offsetParent.className = 'box';
                document.getElementById('field-mail').offsetParent.className = 'box';
                //document.getElementById('btn-deletar').style.display = 'none';
            }
        }
        function limpaCampo(){
    
            document.getElementById('field-id').value = '';
            document.getElementById('field-name').value = '';
            document.getElementById('field-pass').value = '';
            document.getElementById('field-mail').value = '';
        }
                                                        function carregado(){    
   
    document.getElementById('btn-salvar').addEventListener('click', salvar);
    document.getElementById('btn-deletar').addEventListener('click', deletar);
    
    db.transaction(function(tx) {
        //tx.executeSql("DROP TABLE myTable" );
        tx.executeSql("CREATE TABLE IF NOT EXISTS myTable ( id INTEGER PRIMARY KEY,nome TEXT,senha TEXT, email TEXT)" );
//        tx.executeSql('INSERT INTO myTable ( nome,senha,email) VALUES ("a", "b", "c")');
    });
    
    mostrar();
    
}   

function salvar(){

    var id = document.getElementById('field-id').value;
    var nome = document.getElementById('field-name').value;
    var pass = document.getElementById('field-pass').value;
    var mail = document.getElementById('field-mail').value;

    db.transaction(function(tx) {
        if(id){
            tx.executeSql('UPDATE myTable SET nome=?, senha=?, email=? WHERE id=?', [nome,pass,mail,id],null);
        }else{
            tx.executeSql('INSERT INTO myTable ( nome,senha,email) VALUES (?, ?, ?)', [nome,pass,mail]);
        }
    });

    mostrar();
    limpaCampo();
    inputSHOW(false);
}

function mostrar(){        
    var table = document.getElementById('tbody-register');

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM myTable', [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].senha + '</td>';
                    tr += '<td>' + rows[i].email + '</td>';
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });
}

function atualizar(_id){   
    
    var id = document.getElementById('field-id');
    var nome = document.getElementById('field-name');
    var pass = document.getElementById('field-pass');
    var mail = document.getElementById('field-mail');
    
    id.value = _id;
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM myTable WHERE id=?', [_id], function (tx, resultado) {
            var rows = resultado.rows[0];

            nome.value = rows.nome ;
            pass.value = rows.senha ;
            mail.value = rows.email ;
        });
    });
    inputSHOW(true);
}

function deletar(){
    
    var id = document.getElementById('field-id').value;
    
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
    });
    
    mostrar();
    limpaCampo();
    inputSHOW(false);
}







    }
};
