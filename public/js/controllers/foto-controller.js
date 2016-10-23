angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, $routeParams) {
	
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
			if($scope.foto._id) {
				recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function() {
					$scope.mensagem = 'A foto ' + $scope.foto.titulo + ' foi alterada com sucesso.';					
				}, function(error) {
					console.log(error);
					$scope.mensagem = 'Não foi possivel altera a foto ' + $scope.foto.titulo;					
				});
			} else {
				recursoFoto.save($scope.foto, function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto incluida com sucesso!';					
				}, function(error) {
					$scope.mensagem = 'Não foi possivel incluir a foto!';
					console.log(erro);					
				});				
			}
		}
	};
	
});