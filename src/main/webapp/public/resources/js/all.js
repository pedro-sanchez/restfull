function deucerto(){alert("uhuuu")}function raduken(){alert("hahaha")}function mascara(a,b){return v_obj=a,v_fun=b,execmascara(),!1}function execmascara(){return v_obj.value=v_fun(v_obj.value),!1}function leech(a){return a=a.replace(/o/gi,"0"),a=a.replace(/i/gi,"1"),a=a.replace(/z/gi,"2"),a=a.replace(/e/gi,"3"),a=a.replace(/a/gi,"4"),a=a.replace(/s/gi,"5"),a=a.replace(/t/gi,"7")}function Porcentagem100(a){var b=Integer(a);if(b){var c=parseInt(b,10);if(c>100){var d=b.length-1;return b.substr(0,d)}}return b}function Integer(a){return a.replace(/\D/g,"")}function Telefone(a){return a=a.replace(/\D/g,""),a.length>10?Telefone5Digito(a):Telefone4Digito(a)}function Telefone4Digito(a){return a=a.replace(/\D/g,""),a=a.replace(/^(\d\d)(\d)/g,"($1) $2"),a=a.replace(/(\d{4})(\d)/,"$1-$2"),a=maxLength(a,14)}function Telefone5Digito(a){return a=a.replace(/\D/g,""),a=a.replace(/^(\d\d)(\d)/g,"($1) $2"),a=a.replace(/(\d{5})(\d)/,"$1-$2"),a=maxLength(a,15)}function maxLength(a,b){return a.length>b?a.substring(0,b):a}function CpfCnpj(a){return a=a.replace(".",""),a=a.replace("/",""),a=a.replace("-",""),a.length>12?Cnpj(a):Cpf(a)}function Cpf(a){return a?(a=a.replace(/\D/g,""),a=a.replace(/(\d{3})(\d)/,"$1.$2"),a=a.replace(/(\d{3})(\d)/,"$1.$2"),a=a.replace(/(\d{3})(\d{1,2})$/,"$1-$2"),a=maxLength(a,14)):null}function Cnpj(a){return a=a.replace(/\D/g,""),a=a.replace(/^(\d{2})(\d)/,"$1.$2"),a=a.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"),a=a.replace(/\.(\d{3})(\d)/,".$1/$2"),a=a.replace(/(\d{4})(\d)/,"$1-$2"),a=maxLength(a,18)}function Cep(a){return a=a.replace(/\D/g,""),a=a.replace(/^(\d{2})(\d)/,"$1.$2"),a=a.replace(/(\d{3})(\d)/,"$1-$2"),a=maxLength(a,10)}function Data(a){return a=a.replace(/\D/g,""),a=a.replace(/(\d{2})(\d)/,"$1/$2"),a=a.replace(/(\d{2})(\d)/,"$1/$2"),a=maxLength(a,10)}function Hora(a){return a=a.replace(/\D/g,""),a=a.replace(/(\d{2})(\d)/,"$1:$2"),a=maxLength(a,5)}function RemoveZeroEsquerda(a){var b=a.substring(0,1);return"0"==b&&a.length>3?RemoveZeroEsquerda(a.substring(1,a.length)):a}function Valor(a){return a=a.replace(/\D/g,""),a=RemoveZeroEsquerda(a),a=a.replace(/(\d{1})(\d{20})$/,"$1.$2"),a=a.replace(/(\d{1})(\d{17})$/,"$1.$2"),a=a.replace(/(\d{1})(\d{14})$/,"$1.$2"),a=a.replace(/(\d{1})(\d{11})$/,"$1.$2"),a=a.replace(/(\d{1})(\d{8})$/,"$1.$2"),a=a.replace(/(\d{1})(\d{5})$/,"$1.$2"),a=a.replace(/(\d{1})(\d{1,2})$/,"$1,$2")}