# vue-team-tree

 vue-tree

## Introduction

一个PC端的vue组织架构图
[实例](https://w86wh2.github.io/npm_team_tree/dist/)

## Useage
   example:
        <vue_team_tree
            :tree-data="gccList"
            @handle-click-node="getNodeId"
        >
        </vue_team_tree>

     gccList:[
         {
                 id:11,
                 name:'总公司',
                 children:[{
                     id:22,
                     name:'分公司1',
                     children:[]
                 },{
                     id:33,
                     name:'分公司2',
                     children:[]
                 },
                 {
                     id:44,
                     name:'分公司3',
                     children:[]
                 },
                 {
                     id:55,
                     name:'分公司4',
                     children:[]
                 },{
                     id:66,
                     name:'分公司5',
                     children:[
                         {
                             id:66,
                             name:'部门1',
                             children:[]
                         },
                         {
                             id:66,
                             name:'部门2',
                             children:[]
                         },{
                             id:66,
                             name:'部门3',
                             children:[
                                 {
                                     id:66,
                                     name:'部门11',
                                     children:[]
                                 },
                                 {
                                     id:66,
                                     name:'部门22',
                                     children:[]
                                 },{
                                     id:66,
                                     name:'部门33',
                                     children:[]
                                 }
                             ]
                         }
                     ]
                 }
                 ]
             }
     ] 

```
