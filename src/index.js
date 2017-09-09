import vue_team_tree from './vue_team_tree.vue'
var VuePluginTeamTree={};
VuePluginTeamTree.install=function(Vue,opt){
    Vue.component(vue_team_tree.name, vue_team_tree)
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePluginTeamTree);
}
export default VuePluginTeamTree
