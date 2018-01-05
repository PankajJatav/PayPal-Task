var hierarchyApp = angular.module('task2',[]);
hierarchyApp.controller('hierarchyController',function($scope){
    $scope.level = [true, true, true, true, true];
    $scope.showFinished = true;
    $scope.finished = 'This is the end';
    $scope.values = [];
    $scope.top = 'V.P';
    let data = {
        'top': 'V.P',
        'V.P' : ['Dir 1', 'Dir 2'],
        'Dir 1': ['Ast Dir 1', 'Ast Dir 2', 'Ast Dir 3'],
        'Dir 2': ['Ast Dir 4', 'Ast Dir 6'],
        'Ast Dir 1': ['Mgr 1', 'Mgr 2', 'Mgr 3'],
        'Ast Dir 2': ['Mgr 4', 'Mgr 5', 'Mgr 6'],
        'Ast Dir 3': ['Mgr 7', 'Mgr 8', 'Mgr 9','Mgr 13'],
        'Ast Dir 4': ['Mgr 10', 'Mgr 11', 'Mgr 12'],
    }

    $scope.levelColor = [
        {
            'background-color': '#CE93D8',
        },
        {
            'background-color': '#9575CD',
            // 'width': '100px',
            // 'transition' : 'all 2s',        
        },
        {
            'background-color': '#26A69A',

        },
        {
            'background-color': '#757575',

        }
    ]

    let oldVal = '';

    let setValues = function(parent, l){
        $scope.showFinished = true;
        let levelToShow = Number(l)+1;
        if($scope.level[levelToShow]){
            $scope.level[levelToShow] = false;
        }else{
            //hide the things below the clicked thing
            if(oldVal == parent){
                for(let i = levelToShow; i < 10 ; i++){
                    $scope.level[i] = true;
                }
            }else{//make the values of below things to null
                for(let i = levelToShow; i < 10 ; i++){
                    $scope.values[i+1] = [];
                }
            }
        }
        oldVal = parent;
        if(data[parent]){   
            $scope.values[levelToShow] = data[parent];
        }else{
            $scope.showFinished = false;
            $scope.finished = 'This is the end node';
            for(let i = levelToShow; i < 10 ; i++){
                $scope.level[i] = [];
            }
        }
        
    };

    $scope.showHierarchyBelow = function(s){
        var parent = event.srcElement.innerHTML;
        var level = event.srcElement.dataset.level;
       setValues(parent, level);
    }
})