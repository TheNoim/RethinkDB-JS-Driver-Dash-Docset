import 'angular-material/angular-material.min.css';
import 'highlight.js/styles/github.css';
import './main.css';
import 'angular-material-expansion-panel/dist/md-expansion-panel.min.css';

import angular from 'angular';
import ngMaterial from 'angular-material';
import ngRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import config from '../config';

import 'ngletteravatar';
import 'angular-material-expansion-panel/dist/md-expansion-panel.min';

const app = angular.module('Doc', [ngMaterial, ngRouter, ngSanitize, 'ngLetterAvatar', 'material.components.expansionPanels']);


app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette(config.primaryColorTheme || 'indigo')
        .accentPalette(config.accentColorTheme || 'pink');
});

app.controller('Main', function ($scope) {
    $scope.title = config.title;
});

app.controller('Index', function ($scope) {
    $scope.headings = config.headings;
    $scope.sections = [];
    for (let i = 0; i < config.sections.length; i++){
        if (config.sections[i].heading && config.headings.getIndexOf(config.sections[i].heading, 'id') !== null){
            const ind = config.headings.getIndexOf(config.sections[i].heading, 'id');
            if (!$scope.headings[ind].sections){
                $scope.headings[ind].sections = [];
            }
            $scope.headings[ind].sections.push(config.sections[i]);
        } else {
            $scope.sections.push(config.sections[i]);
        }
    }
});

app.controller('PageController', function ($scope, $stateParams, $state, $sce) {
    $scope.safeApply = function(fn) {
        const phase = this.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    if ($stateParams && $stateParams.section) {
        const SectionConfig = getSectionByPath($stateParams.section);
        if (SectionConfig) {
            //document.getElementById('markdown').innerHTML = SectionConfig.markdown;
            $scope.markdown = $sce.trustAsHtml(SectionConfig.markdown);
            $scope.safeApply();
        } else {
            $state.transitionTo('index');
        }
    } else {
        $state.transitionTo('index');
    }
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index/');

    $stateProvider.state('index', {
        url: '/index/:heading',
        template: require('./templates/Index.html'),
        controller: 'Index'
    });

    $stateProvider.state('section', {
        url: '/section/:section',
        template: require('./templates/Section.html'),
        controller: 'PageController'
    })
});

function getSectionByPath(Path) {
    for (let i = 0; i < config.sections.length; i++) {
        if (config.sections[i].path === Path) {
            return config.sections[i];
        }
    }
    return null;
}

Array.prototype.getIndexOf = function (value, name) {
    for (let i = 0; i < this.length; i++){
        if (this[i][name] === value){
            return i;
        }
    }
    return null;
};