<template>
    <div class="tree_data_container">
    <vue_scrollbar
      class="scroll-area"
    >
      <div class="scroll-me">
        <div class="strt-wrap" id="strtWrap">
          <ul class="strt-block">
            <li class="strt-part" v-for ='item,key in trans_data' :key="key">
                      <span
                        class="nodeItem_title" :class="{'active':item._expand&&item.children.length}"
                        @click="changeStatus(trans_data,item,key)"
                        v-html="item.name"
                      >
                      </span>
              <div class="line-v"><span></span></div>
              <ul class="strt-block" v-if="item._expand">
                <li class="strt-part" v-for ='item1,key1 in item.children' :key="key1"
                >
                            <span class="line-h"
                                  v-if="add_next"
                                  :class="{'line-h-o':key1===0,'line-h-l':(key1>0&&key1<=(item.children.length-1))}"
                            ></span>
                            <span class="line-h"
                                  v-if="!add_next"
                                  :class="{'line-h-o':key1===0,'line-h-s':key1===(item.children.length-1),'line-h-l':(key1>0&&key1<(item.children.length-1))}"
                            ></span>
                  <div class="line-v" ><span></span></div>
                  <span class="nodeItem normal"
                        :class="{'active':item1._expand&&item1.children.length}"
                        @click="changeStatus(item.children,item1,key1)"
                        v-html="item1.name"
                  >
                            </span>

                  <div class="line-v" v-if="item1.children.length&&item1._expand"><span></span></div>
                  <ul class="strt-block" v-if="item1._expand">
                    <li class="strt-part" v-for ='item2,key2 in item1.children' :key="key2"
                    >
                                <span class="line-h"
                                      v-if="item1.children.length!==1&&add_next"
                                      :class="{'line-h-o':key2===0,'line-h-l':(key2>0&&key2<(item1.children.length))}"
                                ></span>
                                <span class="line-h"
                                      v-if="item1.children.length!==1&&!add_next"
                                      :class="{'line-h-o':key2===0,'line-h-s':key2===(item1.children.length-1),'line-h-l':(key2>0&&key2<(item1.children.length-1))}"
                                ></span>
                      <div class="line-v" ><span></span></div>
                      <span class="nodeItem normal"
                            :class="{'active':item2._expand&&item2.children.length}"
                            @click="changeStatus(item1.children,item2,key2)"
                            v-html="item2.name"
                      >
                                </span>
                      <div class="line-v" v-if="item2.children.length&&item2._expand"><span></span></div>
                      <ul class="strt-block" v-if="item2._expand">
                        <li class="strt-part" v-for ='item3,key3 in item2.children' :key="key3"
                        >
                                    <span class="line-h"
                                          v-if="add_next"
                                          :class="{'line-h-o':key3===0,'line-h-l':(key3>0&&key3<=(item2.children.length-1))}"
                                    ></span>
                                    <span class="line-h"
                                          v-if="item2.children.length!==1&&!add_next"
                                          :class="{'line-h-o':key3===0,'line-h-s':key3===(item2.children.length-1),'line-h-l':(key3>0&&key3<(item2.children.length-1))}"
                                    ></span>
                          <div class="line-v"><span></span></div>
                          <span class="nodeItem normal"
                                :class="{'active':item3._expand&&item3.children.length}"
                                @click="changeStatus(item2.children,item3,key3)"
                                v-html="item3.name"
                          >
                                    </span>
                          <div class="line-v" v-if="item3.children.length&&item3._expand"><span></span></div>
                        </li>
                        <li class="strt-part" v-if="add_next&&item2.children.length>0">
                          <span class="line-h line-h-s"></span>
                          <div class="line-v"><span></span></div>
                          <span class="nodeItem addButton" @click="addNext(item2)"><i class="icon iconfont icon-xinzeng">+</i></span>
                        </li>
                      </ul>
                    </li>
                    <li class="strt-part" v-if="add_next&&item1.children.length>0">
                      <span class="line-h line-h-s"></span>
                      <div class="line-v"><span></span></div>
                      <span class="nodeItem addButton" @click="addNext(item1)"><i class="icon iconfont icon-xinzeng">+</i></span>
                    </li>
                  </ul>
                </li>
                <li class="strt-part" v-if="add_next&&item.children.length>0">
                  <span class="line-h line-h-s"></span>
                  <div class="line-v"><span></span></div>
                  <span class="nodeItem addButton" @click="addNext(item)">
                    <i class="icon iconfont icon-xinzeng">+</i>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!--容器内容结束-->
        <div class="clearfix"></div>
      </div>
    </vue_scrollbar>
  </div>      
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar';
    import $ from 'jquery'
    import './jquery.ui.draggable.min.js'
    export default {
        name:'vue_team_tree',
        props:['tree-data','add_next'],
        components:{
            'vue_scrollbar':VueScrollbar
        },
        data(){
            return {
            }
        },
        computed:{
          trans_data(){
            let temp=this.treeData;
            console.log(temp);
            return this.initData(this.treeData);
          }

        },
//        watch:{
//            treeData(val){
//                let temp=val;
//                this.trans_data=this.initData(temp);
//            }
//        },
        methods:{
            initData(list=[]){
        let temp = false;
        list.map((item,key)=>{
          this.$set(item,'_expand',false)
          if(item.children.length&&!temp){
            this.$set(item,'_expand',true)
            //如果只有一个子集需处理数据
            if(item.children.length===1){
              let name_f = item.name.length;
              let name_n=item.children[0].name.length;
              if(name_f>name_n){
                let n =name_f-name_n;
                let nb='';
                for(let i=0;i<n;i++){
                  nb+='&nbsp;'
                }
                item.children[0].name=nb+item.children[0].name+nb
              }
            }
            temp=true;
            this.initData(item.children)
          }
        })
        return list;
      },
      addNext(item){
          this.$emit('add_office',item)
      },
      changeStatus(list,ite,key){
        list.map((item)=>{
          this.$set(item,'_expand',false)
        });
        this.$set(ite,'_expand',true)
        this.$emit('handleClickNode',ite.id);

        //如果只有一个子集需处理数据
        if(ite.children.length===1){
          let name_f = ite.name.length;
          let name_n=ite.children[0].name.length;
          if(name_f>name_n){
            let n =name_f-name_n;
            let nb='';
            for(let i=0;i<n*2;i++){
              nb+='&nbsp;'
            }
            console.log(nb);
            ite.children[0].name=nb+ite.children[0].name+nb
          }
        }
      }
        },
        creared(){


        },
        mounted(){
            this.$nextTick(()=>{
                $(function(){
                    var strtWrap=$("#strtWrap");
                    strtWrap.draggable({
                        cursor:"move",
                        opacity:1
                    });
                });
            })
        }
    }

</script>

<style lang="scss">
    ul{
      list-style:none;
    }
    .tree_data_container{
        position:relative;
        .strt-wrap{width:100000px;margin:10px;cursor:move;}
        .strt-block{float:left;}
        .strt-part{text-align:center;float:left;position:relative;}
        .strt-part .line-v{position:relative;height:18px;width:100%;}
        .strt-part .line-v span{
        display:block;
        background:#ccc;
        position:absolute;
        top:0;
        font-size:0;
        line-height:1px;
        width:1px;
        height:18px;
        left:50%;
        }
        .strt-part .line-h{height:1px;display:block;background:#ccc;position:absolute;top:0;font-size:0;}
        .strt-part .line-h-l{width:100%;left:0;}
        .strt-part .line-h-s{width:50%;left:0;}
        .strt-part .line-h-o{width:50%;right:0;}
        width:100%;
        height:100%;
        .scroll-area{
        width:100%;
        height:270px;
        background:#fef8f0;
        max-width: 300%;

        .scroll-me{
            min-width: 1700px;
            min-height:10px
        }
        }
        .nodeItem_title{
        height:24px;
        line-height:24px;
        /*background:#38acee;*/
        color:#fff;
        display: inline-block;
        padding:5px 40px;
        margin:0 10px;
        }
        .nodeItem{
        position:relative;
        height:24px;
        line-height:24px;
        /*border:1px solid red;*/
        background:#38acee;
        color:#fff;
        display: inline-block;
        padding:5px 20px;
        margin:0 10px;
        &:after{
            content: '';
            display: block;
            position:absolute;
            /*background:#319edc;*/
            width: 50%;
            height:10px;
            top:0;
            left:0;
            z-index: 1;
            transform:skew(90deg,90deg);
            /*border-left: 50px solid transparent;*/
            /*border-right: 50px solid transparent;*/
            /*border-bottom: 5px solid #319edc;*/
        }
        &.active{
            background:#f56e6d;
        }
        }
        .addButton{
        background:#e9e9e9;
        padding:5px 40px;
        }

  }    
</style>

