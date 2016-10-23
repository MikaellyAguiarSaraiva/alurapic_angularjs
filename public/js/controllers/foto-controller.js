angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, cadastroDeFotos, $routeParams) {
	
	$scope.foto = {};
	$scope.mensagem = '';
	
	if($routeParams.fotoId) {	
		recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto) {
			$scope.foto = foto;			
		}, function(error) {
			console.log(error);
			$scope.mensagem = 'Não foi possivel obter a foto.';			
		});
	}
	
	$scope.submeter = function() {
		if($scope.formulario.$valid) {
			cadastroDeFotos.cadastrar($scope.foto).then(function(dados) {
				$scope.mensagem = dados.mensagem;
				if(dados.inclusao) {
					$scope.foto = {};
				}
			}).catch(function(dados) {
				$scope.mensagem = dados.mensagem;
			});
		}
	};
	
});