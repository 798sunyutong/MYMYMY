<template>
  <div class="dataShow">
    <div class="top">
      <el-tabs type="card" style="height:100%" v-model="activeName" v-for="(item,index) in menuList" :key="index" @tab-click="handleClickMenu(item.id,'true')">
        <el-tab-pane :disabled="is_able" :label="item.name" :name="item.id"></el-tab-pane>
      </el-tabs>
      <el-button :type="openOrClose ? 'success': 'danger'" size="mini" style="position:absolute;right:50px;" @click="openShow">{{openOrCloseName}}状态</el-button>
    </div>
    <div class="Inspection" v-show="inspectionIsShow">
      <div class="inspect_left_box">
        <div class="inspect_left_content"><b>{{procedureState}}</b><img class="text-primary" src="../../assets/images/333.png" @click="inspectionIsShow = false"/></div>
        <div style="margin:10px -5px 10px 20px;">
          <el-progress type="line" :percentage="progress"></el-progress>
        </div>
        <nav class="inspect_left_nav">
          <el-button-group class="btn">
            <el-button type="success" size="mini" title="开始巡检" icon="iconfont icon-zanting-kaishi" :disabled="is_able" @click.prevent="start_inspection"></el-button>
            <el-button type="warning" size="mini" title="暂停巡检" icon="iconfont icon-zanting" :disabled="is_state" @click.prevent="pause_inspection"></el-button>
            <el-button type="primary" size="mini" title="继续巡检" icon="iconfont icon-kuaijin" :disabled="state" @click.prevent="continue_inspection"></el-button>
            <el-button type="danger" size="mini" title="停止巡检" icon="iconfont icon-stop" :disabled="able" @click.prevent="stop_inspection(0)"></el-button>
          </el-button-group>  
        </nav>
      </div>
    </div>
    <img class="Inspection_btn" src="../../assets/images/111.png" @click="closeInspection"/>
    <div class="right" >
      <img :src="imgUrl" alt="" class="right_image">
      <img v-if="menuListIndex === '1'" class="imgMask right_image" src="../../assets/tuoer/guaijiao.png">
      <img v-if="menuListIndex === '2'" class="imgMask right_image" src="../../assets/tuoer/2gj.png">
      <img v-if="menuListIndex === '3'" class="imgMask right_image" src="../../assets/tuoer/3gj.png">
      <img v-if="menuListIndex === '4'" class="imgMask right_image" src="../../assets/tuoer/4gj.png">
      <img v-if="menuListIndex === '5'" class="imgMask right_image" src="../../assets/tuoer/5gj.png">
      <img v-if="menuListIndex === '6'" class="imgMask right_image" src="../../assets/tuoer/6gj.png">
      <img v-if="menuListIndex === '7'" class="imgMask right_image" src="../../assets/tuoer/7gj.png">
      <img v-if="menuListIndex === '8'" class="imgMask right_image" src="../../assets/tuoer/8gj.png">
      <span  v-if="menuListIndex === '1'">
        <div v-for="(items, index) in animateArr" :key="index+ '-only'" style="position:absolute;height:100%;width:100%;top:0">
          <img class="inspectImgList" :class="{inspectImgActive : isIndex === index}" :style="{left:items.x,top:items.y,width:items.w,height:items.h}" @click="clickInspectImg(index,items)"
          :src="items.imgSrc" @contextmenu.prevent="showright(items)" >
          <div v-if="items.isRun == 1 && openOrClose" class="popoverright" :style="{left:items.x1,top:items.y1}"></div>
          <div class="popover" v-if="visible && openOrClose" :style="{left:popoverLeft,top:popoverTop}">
            <div class="popover_title">
              {{unitname}}
              <img @click="hideright" style="width:14px;float:right" src="../../assets/images/333.png"/>
              <div class="popover_border"></div>
            </div>
            <div class="popover_content">
              <p>设备品牌：山东大成电子科技有限公司</p>
              <p>安装时间：2020-10-16</p>
            </div>
            <div class="popover_btn">
              <span style="margin-right:5px">运行状态：</span>
              <el-switch :disabled='disabled' v-model="popoverData.isRun" active-color="#13ce66" :active-value="0" :inactive-value="1"
                active-text="开启" inactive-text="停止" inactive-color="#ff4949" :width="60"
                @change="handleSetData(popoverData)">
              </el-switch>
            </div>
          </div>
        </div>
          <div class="maskPotContent" v-show="openOrClose" style="position:absolute;height:100%;width:100%;top:0">
            <div  style="position:absolute;height:100%;width:100%;top:0" v-for="(item, index) in rightDataZ" :key="index" >
              <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
                class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
                @contextmenu.prevent="showright1(item)">
                <span>
                  {{item.name}}
                  <span class="dataColor" :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}">{{item.data}}</span>
                  {{item.unit}}
                </span>
              </span>
              <div class="popover popover1" v-if="visible1" :style="{left:popoverLeft,top:popoverTop}">
                  <div class="popover_title" style="margin-bottom:5px">
                    调节阀
                    <img @click="hideright1" style="width:14px;float:right" src="../../assets/images/333.png"/>
                    <div class="popover_border"></div>
                  </div>
                  <div class="popover_content" style="display:flex;align-items: center;padding:8px 0;">
                    <span>参数设置：</span>
                    <el-input size="mini" v-model="meterNum">
                      <template slot="append">
                        <el-button type="primary" size="mini" style="color:green" @click="meterOk(item)">确定</el-button>
                      </template>
                    </el-input>
                  </div>
                </div>
            </div>
          </div>
          <div class="maskPotContent" v-show="!openOrClose">
            <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警',seen:seen === index}" 
              class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
              v-for="(item, index) in rightDataZ" :key="index">
              <span >
                {{item.name}}
                <span class="dataColor" :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}">{{item.data}}</span>
                {{item.unit}}
              </span>
              <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
              <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
            </span>
          </div>
        <div class="maskPotContent">
          <div class="maskPotW" :class="{maskPot:item.c === '1'}" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW" :key="index"></div>
        </div>
        <div class="maskPotContent">
          <div class="maskPot" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListJ" :key="index"></div>
        </div>
        <div class="maskPotContent">
          <img v-show="item.srcimg" :src="item.srcimg" style="position:absolute;z-index:50" :style="{width:item.w,height:item.h1,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW" :key="index">
        </div>
        <LOCALA :msg="stopArr" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;opacity:0.7" v-if="reFreshA"></LOCALA>
        <LOCALB :msg="stopArr" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;opacity:0.7" v-if="reFreshB"></LOCALB>
      </span>
      <span v-if="menuListIndex === '2'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
           v-for="(item, index) in rightDataY" :key="index">
           <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span> &nbsp;&nbsp;{{item.unit}}
           </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span> 
      </span>
        <div>
          <img class="inspectImgList" :style="{left:item.x,top:item.y,width:item.w,height:item.h}" @click="clickInspectImg(index,item)"
        :src="item.imgSrc" v-for="(item, index) in maskY" :key="index" >
        </div>
        <div class="maskPotContent">
          <div class="maskPotW" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW2" :key="index"></div>
        </div>
        <div class="maskPotContent">
          <div class="maskPot" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListJ2" :key="index"></div>
        </div>
        <div class="maskPotContent">
          <img :src="item.srcimg" style="position:absolute;z-index:50" :style="{width:item.w,height:item.h1,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW2" :key="index">
        </div>
        <LOCALA2 :msg="num.num2" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA2>
        <LOCALB2 :msg="num.num2" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB2>
      </span>
      <span v-if="menuListIndex === '3'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
          v-for="(item, index) in rightData3" :key="index">
          <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span>&nbsp;&nbsp;{{item.unit}}
          </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
        </span>
        <div>
          <img class="inspectImgList" :style="{left:item.x,top:item.y,width:item.w,height:item.h}" @click="clickInspectImg(index,item)"
          :src="item.imgSrc" v-for="(item, index) in maskX" :key="index" >
        </div>
        <div class="maskPotContent">
          <div class="maskPot" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW3" :key="index"></div>
        </div>
        <LOCALA3 :msg="num.num3" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA3>
        <LOCALB3 :msg="num.num3" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB3>
      </span>
      <span v-if="menuListIndex === '4'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
          v-for="(item, index) in rightData4" :key="index">
          <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span> &nbsp;&nbsp;{{item.unit}} 
          </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
        </span>
        <div>
          <img class="inspectImgList" :style="{left:item.x,top:item.y,width:item.w,height:item.h}" @click="clickInspectImg(index,item)"
          :src="item.imgSrc" v-for="(item, index) in maskW" :key="index" >
        </div>
        <div class="maskPotContent">
          <div class="maskPotW" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW4" :key="index"></div>
        </div>
        <div class="maskPotContent">
          <div class="maskPot" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListJ4" :key="index"></div>
        </div>
        <LOCALA4 :msg="num.num4" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA4>
        <LOCALB4 :msg="num.num4" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB4>
      </span>
      <span v-if="menuListIndex === '5'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
          v-for="(item, index) in rightData5" :key="index">
          <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span> &nbsp;&nbsp;{{item.unit}} 
          </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
        </span>
        <div class="maskPotContent">
          <div class="maskPot" :style="{width:item.w,height:item.h,left:item.x,bottom:item.y}" v-for="(item,index) in maskPotListW5" :key="index"></div>
        </div>
        <LOCALA5 :msg="num.num5" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA5>
        <LOCALB5 :msg="num.num5" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB5>
      </span>
      <span v-if="menuListIndex === '6'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
          v-for="(item, index) in rightData6" :key="index">
          <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span>&nbsp;&nbsp;{{item.unit}} 
          </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
        </span>
        <LOCALA6 :msg="num.num6" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA6>
        <LOCALB6 :msg="num.num6" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB6>
      </span>
      <span v-if="menuListIndex === '7'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
          v-for="(item, index) in rightData7" :key="index">
          <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span>&nbsp;&nbsp;{{item.unit}} 
          </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
        </span>
        <div>
          <img class="inspectImgList" :style="{left:item.x,top:item.y,width:item.w,height:item.h}" @click="clickInspectImg(index,item)"
        :src="item.imgSrc" v-for="(item, index) in mask7" :key="index" >
        </div>
        <LOCALA7 :msg="num.num7" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA7>
        <LOCALB7 :msg="num.num7" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB7>
      </span>
      <span v-if="menuListIndex === '8'">
        <span :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" 
          class="span" :style="{'position':'absolute','left':item.x,'top':item.y,'width':item.w,'height':item.h}" 
          v-for="(item, index) in rightData8" :key="index">
          <span >
            {{item.name}}&nbsp;&nbsp;<span class="dataColor"  :class="{police: item.warnType === '低报警' ||item.warnType === '低低报警' ||item.warnType === '高报警' ||item.warnType === '高高报警'}" >{{item.data}}</span>&nbsp;&nbsp;{{item.unit}} 
          </span>
          <span class="police" v-if="item.warnType === '低报警' || item.warnType === '低低报警'">↓</span>
          <span class="police" v-if="item.warnType === '高报警' || item.warnType === '高高报警'">↑</span>
        </span>
        <div>
          <img class="inspectImgList" :style="{left:item.x,top:item.y,width:item.w,height:item.h}" @click="clickInspectImg(index,item)"
          :src="item.imgSrc" v-for="(item, index) in mask8" :key="index" >
        </div>
        <LOCALA8 :msg="num.num8" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshA"></LOCALA8>
        <LOCALB8 :msg="num.num8" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.7" v-if="reFreshB"></LOCALB8>
      </span>
    </div>
    <!-- 巡检报告 -->
    <!-- 巡检报告 --> 
      <el-dialog
        title="巡检报告"
        :visible.sync="dialogVisible"
        width="1000px"
        :close-on-click-modal = false
        :close-on-press-escape = false
        :before-close="handleClose">
          <div class="visibleBox">
            <div class="visibleItem">
              <div class="visibleItemLeft">
                <div class="visibleTitle rightBorder textSpace">值班人</div>
                <div class="visibleValue rightBorder" >{{userName}}</div>
              </div>
              <div class="visibleItemRight">
                <div class="visibleTitle rightBorder textSpace">巡检时间</div>
                <div class="visibleValue">{{startTime}} 到 {{endTime}}</div>
              </div>
            </div>
            <div class="visibleItem">
              <div class="visibleItemLeft">
                <div class="visibleTitle rightBorder textSpace">巡检设备数</div>
                <div class="visibleValue rightBorder " >{{deviceSum}}</div>
              </div>
              <div class="visibleItemRight">
                <div class="visibleTitle rightBorder textSpace">设备报警数</div>
                <div class="visibleValue">{{warnDeviceSum}}</div>
              </div>
            </div>
            <div class="visibleItem">
              <div class="visibleItemLeft">
                <div class="visibleTitle rightBorder textSpace">巡检仪表数</div>
                <div class="visibleValue rightBorder " >{{meterSum}}</div>
              </div>
              <div class="visibleItemRight">
                <div class="visibleTitle rightBorder textSpace">仪表报警数</div>
                <div class="visibleValue">{{warnMeterSum}}</div>
              </div>
            </div>
            <div class="visibleItem">
              <div class="visibleItemLeft visibleItemLeftSpecial">
                <div class="visibleTitle rightBorder textSpace">巡检范围</div>
                <div class="visibleValue textLineHeight" >
                  {{inspectionScope}}
                </div>
              </div>
            </div>
            <div class="visibleItem">
              <div class="visibleItemLeft visibleItemLeftSpecial">
                <div class="visibleTitle rightBorder textSpace">报警信息</div>
                <div class="visibleValue " style="padding: 0;" >
                  <div class="" v-if="!is_result_show">无</div>
                  <el-table 
                  v-if="is_result_show" 
                  size="mini"
                  max-height="200"
                  :data="inspectionResults" 
                  border>
                    <el-table-column type="index"></el-table-column>
                    <!-- <el-table-column property="meterName" label="仪表名称"></el-table-column>
                    <el-table-column property="deviceName" label="设备名称"></el-table-column> -->
                    <el-table-column property="deviceName" label="设备名称">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row.deviceName" placement="top">
                        <span class="texthanlde">{{ scope.row.deviceName }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column property="meterName" label="仪表名称">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row.meterName" placement="top">
                        <span class="texthanlde">{{ scope.row.meterName }}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                    <el-table-column property="meterType" label="设备类型" width="80" ></el-table-column>
                    <el-table-column property="warnTime" label="报警时间" width="140"></el-table-column>
                    <el-table-column property="warnType" label="报警类型" width="80" ></el-table-column>
                  </el-table> 
                </div>
              </div>
            </div>
            <div class="visibleItem">
              <div class="visibleItemLeft visibleItemLeftSpecial" style="border-bottom: none">
                <div class="visibleTitle rightBorder textSpace" >结论</div>
                <div class="visibleValue " :class="is_result_show ? 'error' : 'success'">
                  {{inspectionResult}}
                </div>
              </div>
            </div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit_inspection_log">确 认</el-button>
        </span>
      </el-dialog>
    <!-- 参数设置 -->
    <el-dialog
      title="巡检参数设置"
      class="setDialog"
      :visible.sync="paramsSetDialog"
      width="80%"
      top=6vh
      >
      <!-- <div class="dia_box_contain"> -->
        <el-table
          :header-cell-style="getRowClass"
          :data="deviceData"
          border
          max-height="600"
          size="mini"
          style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="80">
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="设备名称"
            width="">
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="所属区域"
            width="300">
          </el-table-column>
          <el-table-column
            prop=""
            label="是否巡检"
            width="140"
            >
            <template slot-scope="scope">
            <el-switch v-model="scope.row.isSpection" active-color="#13ce66" :active-value="0" :inactive-value="1"
              active-text="巡检" inactive-text="不巡检" inactive-color="#ff4949" :width="60"
              @change="handleToggleRecycleStatus(scope.row)">
            </el-switch>
          </template>
          </el-table-column>
          <el-table-column prop="isRun" label="运行状态" width="140">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isRun" active-color="#13ce66" :active-value="0" :inactive-value="1"
                active-text="是" inactive-text="否" inactive-color="#ff4949" :width="60"
                @change="handleSetRuning(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          
          <el-table-column
            prop="recyTime"
            label="巡检时间"
            width="260">
            <template slot-scope="scope">
              <el-input v-model="scope.row.inspectionTime" size="mini" @change='handleTimeSet(scope.$index,scope.row)'>
                <template slot="append"><div style=""  title='点击切换单位' @click="changeUnit(scope.row)">分</div></template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="调整顺序"
            width="160"
            >
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" icon="el-icon-caret-top" @click="handleUpAndDown(scope.$index,scope.row,-1)"></el-button>
                <el-button type="primary" size="mini" icon="el-icon-caret-bottom" @click="handleUpAndDown(scope.$index,scope.row,1)"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        
        </el-table>
      <!-- </div> -->
        
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="paramsSetDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置阈值 -->
      <el-dialog
        title="阈值参数设置"
        class="setDialog"
        :visible.sync="thresholdParameter"
        width="65%"
        top=6vh
        >
        <el-table
          :data="attrArr"
          height="90%"
          border
          size="mini"
          style="width: 100%">
          <el-table-column 
            prop="meterThresholdValue"
            label="实时数据"
            width="120">
              <template slot-scope="scope">
                <span style="color:green;">{{scope.row.meterThresholdValue && scope.row.meterThresholdValue}}</span>
              </template>
            </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="meterName"
            label="仪表名称"
            width="150">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model="scope.row.meterName"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="descValuesStr"
            label="仪表描述"
            width="150">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model="scope.row.descValuesStr"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="leftRangesStr"
            label="左侧合理值"
            width="120">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model.number="scope.row.leftRangesStr"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="rightRangesStr"
            label="右侧合理值"
            width="120">
            <template slot-scope="scope">
              <el-input  size="mini" v-model.number="scope.row.rightRangesStr"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="minminWarningValue"
            label="低低报警"
            width="100">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model.number="scope.row.minminWarningValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="minWarningValue"
            label="低报警"
            width="100">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model.number="scope.row.minWarningValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="maxWarningValue"
            label="高报警"
            width="100">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model.number="scope.row.maxWarningValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="maxmaxWarningValue"
            label="高高报警"
            width="100">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model.number="scope.row.maxmaxWarningValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="trendValuesStr"
            label="趋势报警"
            width="150">
            <template slot-scope="scope">
              <el-input  size="mini"  v-model.number="scope.row.trendValuesStr">
                <template size="mini" slot="append">%</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="isOk(scope.row)">确定</el-button>
            </template>
          </el-table-column>
          </el-table>
        
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary">确 定</el-button>
        </span> -->
      </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations} from "vuex";
import LOCALA from './localA/localA.vue';
import LOCALB from './localB/localB.vue';
import LOCALA2 from './localA/localA2.vue';
import LOCALB2 from './localB/localB2.vue';
import LOCALA3 from './localA/localA3.vue';
import LOCALB3 from './localB/localB3.vue';
import LOCALA4 from './localA/localA4.vue';
import LOCALB4 from './localB/localB4.vue';
import LOCALA5 from './localA/localA5.vue';
import LOCALB5 from './localB/localB5.vue';
import LOCALA6 from './localA/localA6.vue';
import LOCALB6 from './localB/localB6.vue';
import LOCALA7 from './localA/localA7.vue';
import LOCALB7 from './localB/localB7.vue';
import LOCALA8 from './localA/localA8.vue';
import LOCALB8 from './localB/localB8.vue';
export default {
  name:"Inspect_data",
  components:{
    LOCALA,
    LOCALB,
    LOCALA2,
    LOCALB2,
    LOCALA3,
    LOCALB3,
    LOCALA4,
    LOCALB4,
    LOCALA5,
    LOCALB5,
    LOCALA6,
    LOCALB6,
    LOCALA7,
    LOCALB7,
    LOCALA8,
    LOCALB8,
  },
  data() {
    return {
      openOrCloseName:"关闭",
      openOrClose:false,
      visible:false,    //右键触发的弹窗
      visible1:false,       //右键点击仪表的弹窗
      disabled:false,
      unitname:"",      //设备名称
      meterNum:"",        //仪表阀值设置值
      popoverTop:"",    //弹窗的定位
      popoverLeft:"",     //弹窗的定位
      popoverShow:0,       //是否开启，默认开启
      popoverData:"",       //不开启的设备
      meterData:"",     //设置阀值的仪表
      stopArr:[],         //需要停止的流动图数组
      meterListArr:[],      //需要停止的流动图仪表数组，设备停止，数据为0
      meterOkArr:[],      //给仪表设置阀值，
      accumulation:0,     //累加的值
      meterListA:[    //六个流量仪表
        {id:'main_lsgx01_sll01'},
        {id:'main_lsgx01_slllj01'},
        {id:'main_yjcjg01_yw01'},
        {id:'main_ejcjg02_yw01'},
        {id:'main_jhyg03_yw01'},
        {id:'main_yjcjg04_yw01'},
        {id:'main_ejcjg06_yw01'},
        {id:'main_jhyg05_yw01'},
        ],      
      popoverList:[     //设备对应的流动图
        {unityId:"ccsbf_ccsbfq_ccswsb01",stopArr:['bottom143','bottom147'],meterId:"main_ccswsb01_ckyl01"},
        {unityId:"ccsbf_ccsbfq_ccswsb02",stopArr:['bottom142','bottom146'],meterId:"main_ccswsb02_ckyl01"},
        {unityId:"ccsbf_ccsbfq_ccswsb03",stopArr:['bottom141','bottom145'],meterId:"main_ccswsb03_ckyl01"},
        {unityId:"ccsbf_ccsbfq_ccswsb04",stopArr:['bottom140','bottom144'],meterId:"main_ccswsb04_ckyl01"},
        {unityId:"yywsbf_yywsbfq_yywsb01",stopArr:['bottom175','bottom189'],meterId:""},
        {unityId:"yywsbf_yywsbfq_yywsb02",stopArr:['bottom174','bottom188'],meterId:"main_yywsb02_ckyl01"},
        {unityId:"yywsbf_yywsbfq_yywsb03",stopArr:['bottom173','bottom187'],meterId:"main_yywsb03_ckyl01"},
        {unityId:"yywsbf_yywsbfq_yywsb04",stopArr:['bottom172','bottom186'],meterId:"main_yywsb04_ckyl01"},
        {unityId:"yywsbf_yywsbfq_yywsb05",stopArr:['bottom171','bottom185'],meterId:""},
      ],    
      isIndex:'',
      inspectionIsShow:false,
      userName: localStorage.getItem('userName'),
      userId: localStorage.getItem("userId"),
      menuList: [
        {name: "总流程",id: "1"},
        {name: "分离区",id: "2"},
        {name: "消防罐区",id: "3"},
        {name: "油罐区",id: "4"},
        {name: "污水处理",id: "5"},
        {name: "油泵换热器区",id: "6"},
        {name: "大罐收气区",id: "7"},
        {name: "污水加药",id: "8"},
      ],
      activeName:"1",
      menuListIndex: "1",
      animateIndex:0,
      animateIndexZ:0,
      imgUrl: require('../../assets/tuoer/1.png'),
      procedureState: "已停止巡检",
      timeout: "未定义",
      timeSetData:'',
      state: true,
      is_state: true,
      able: true,
      isInputShow: false, //定时时间设置
      startTime: "",  //巡检开始时间
      endTime: "",  //巡检结束时间
      inspectionResults: [],  //巡检结果数组
      dialogVisible:false,  //巡检报告弹框
      warnDeviceSum:"",
      inspectionResults: [],  //巡检报告弹框数组
      inspectionResult: "",
      inspectionStatus: "",
      deviceSum:"",
      meterSum:"",
      warnMeterSum: "",
      inspectionScope: "",
      inspectionResults: "",
      paramsSetDialog: false, //参数设置弹框
      rightData:[],
      timeSet: 0,
      rightDataZ:[   //总图
        {id:'main_jzgx01_jkyl01',x:'5.2%',y:'13%',w:'6%',h:'2%',data:'', name:'压力',warnType:''},
        {id:'main_jzgx01_jkwd01',x:'5.2%',y:'15%',w:'6%',h:'2%',data:'',name:'温度',warnType:''},
        {id:'main_jzgx02_jkyl01',x:'5.2%',y:'19%',w:'6%',h:'2%',data:'', name:'压力',warnType:''},
        {id:'main_jzgx02_jkwd01',x:'5.2%',y:'21%',w:'6%',h:'2%',data:'',name:'温度',warnType:''},
        {id:'main_jzgx03_jkyl01',x:'5.2%',y:'26%',w:'6%',h:'2%',data:'', name:'压力',warnType:''},
        {id:'main_jzgx03_jkwd01',x:'5.2%',y:'28%',w:'6%',h:'2%',data:'',name:'温度',warnType:''},
        {id:'main_jzgx04_jkyl01',x:'5.2%',y:'33%',w:'6%',h:'2%',data:'', name:'压力',warnType:''},
        {id:'main_jzgx04_jkwd01',x:'5.2%',y:'35%',w:'6%',h:'2%',data:'',name:'温度',warnType:''},
        {id:'main_jzgx05_jkyl01',x:'5.2%',y:'40%',w:'6%',h:'2%',data:'', name:'压力',warnType:''},
        {id:'main_jzgx05_jkwd01',x:'5.2%',y:'42%',w:'6%',h:'2%',data:'',name:'温度',warnType:''},
        {id:'main_jzgx06_jkyl01',x:'5.2%',y:'48%',w:'6%',h:'2%',data:'', name:'压力',warnType:''},
        {id:'main_jzgx06_jkwd01',x:'5.2%',y:'50%',w:'6%',h:'2%',data:'',name:'温度',warnType:''},
        {id:'main_yjcjg01_yw01',x:'31%',y:'8%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_ejcjg02_yw01',x:'42%',y:'8%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_jhyg03_yw01',x:'54%',y:'8%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_yjcjg04_yw01',x:'31%',y:'26%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_ejcjg06_yw01',x:'42%',y:'26%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_jhyg05_yw01',x:'53.5%',y:'26%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_xfg01_yw01',x:'76.5%',y:'6%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},//消防罐区域
        {id:'main_xfg03_yw01',x:'92%',y:'6%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_lsgx01_sll01',x:'63%',y:'26%',w:'6%',h:'2%',data:'',name:'瞬时',warnType:''},
        {id:'main_lsgx01_slllj01',x:'63%',y:'29%',w:'6%',h:'2%',data:'',name:'累计',warnType:''},
        {id:'main_cyg01_yw01',x:'76.5%',y:'24%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_cyg02_yw01',x:'89%',y:'24%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_cjg03_yw01',x:'76.5%',y:'39%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_cjg04_yw01',x:'89%',y:'39%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_hcg05_yw01',x:'76.5%',y:'55%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_hcg06_yw01',x:'89%',y:'55%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_sgg01_yw01',x:'76.5%',y:'71%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_sgg02_yw01',x:'89%',y:'71%',w:'6%',h:'2%',data:'',name:'液位',warnType:''},
        {id:'main_zqhrq_jkyl01',x:'50%',y:'50%',w:'6%',h:'2%',data:'',name:'进口压力',warnType:''},
        {id:'main_zqhrq_jkwd01',x:'58%',y:'50%',w:'6%',h:'2%',data:'',name:'进口温度',warnType:''},
        {id:'main_zqhrq_ckyl01',x:'50%',y:'52%',w:'6%',h:'2%',data:'',name:'出口压力',warnType:''},
        {id:'main_zqhrq_ckwd01',x:'58%',y:'52%',w:'6%',h:'2%',data:'',name:'出口温度',warnType:''},
        {id:'main_tsb01_ckyl01',x:'31%',y:'56.5%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_tsb02_ckyl01',x:'37%',y:'56.5%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        // {id:'main_zsg01_yw01',x:'33%',y:'61%',w:'6%',h:'2%',data:'',name:'总外输温度',warnType:''},//wei 
        {id:'main_yyhg01_ckwd01',x:'41%',y:'61%',w:'6%',h:'2%',data:'',name:'出口温度',warnType:''},
        {id:'main_yywsb02_ckyl01',x:'42%',y:'66%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_yywsb03_ckyl01',x:'48.5%',y:'66%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_yywsb04_ckyl01',x:'54%',y:'66%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_yl01',x:'49%',y:'74%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb01_ckyl01',x:'45%',y:'88%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb02_ckyl01',x:'52%',y:'88%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb03_ckyl01',x:'59%',y:'88%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb04_ckyl01',x:'66%',y:'88%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_glq01_ckyl01',x:'26%',y:'79%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_t3ll01',x:'18%',y:'73.5%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_t3lllj01',x:'18%',y:'75.5%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_s9ll01',x:'18%',y:'81.5%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_s9lllj01',x:'18%',y:'83.5%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_s5ll01',x:'18%',y:'91%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_s5lllj01',x:'18%',y:'93%',w:'6%',h:'2%',data:'',name:'压力',warnType:''},
      ],
      rightDataY:[//分离区
       {id:'main_jzgx01_jkyl01',x:'13%',y:'9%',w:'8%',h:'3%',data:'',name:'进口压力',warnType:''},
        {id:'main_jzgx01_jkwd01',x:'22%',y:'9%',w:'8%',h:'3%',data:'',name:'进口温度',warnType:''},
        {id:'main_flq01_yyw01',  x:'13%',y:'5%',w:'8%',h:'3%',data:'',  name:'油腔液位',warnType:''},
        {id:'main_flq01_syw01',  x:'22%',y:'5%',w:'8%',h:'3%',data:'',  name:'水腔液位',warnType:''},
        {id:'main_jzgx02_jkyl01',  x:'13%',y:'24%',w:'8%',h:'3%',data:'',  name:'进口压力',warnType:''},
        {id:'main_jzgx02_jkwd01',  x:'22%',y:'24%',w:'8%',h:'3%',data:'',  name:'进口温度',warnType:''},
        {id:'main_flq02_yyw01',  x:'13%',y:'20%',w:'8%',h:'3%',data:'',  name:'油腔液位',warnType:''},
        {id:'main_flq02_syw01',x:'22%',y:'20%',w:'8%',h:'3%',data:'',name:'水腔液位',warnType:''},
        {id:'main_jzgx03_jkyl01',x:'13%',y:'38%',w:'8%',h:'3%',data:'', name:'进口压力',warnType:''},
        {id:'main_jzgx03_jkwd01',x:'22%',y:'38%',w:'8%',h:'3%',data:'',   name:'进口温度',warnType:''},
        {id:'main_flq03_yyw01',x:'13%',y:'34%',w:'8%',h:'3%',data:'',name:'油腔液位',warnType:''},
        {id:'main_flq03_syw01',x:'22%',y:'34%',w:'8%',h:'3%',data:'', name:'水腔液位',warnType:''},
        {id:'main_jzgx04_jkyl01',x:'13%',y:'53%',w:'8%',h:'3%',data:'',  name:'进口压力',warnType:''},
        {id:'main_jzgx04_jkwd01',x:'22%',y:'53%',w:'8%',h:'3%',data:'',name:'进口温度',warnType:''},
        {id:'main_flq04_yyw01',  x:'13%',y:'49%',w:'8%',h:'3%',data:'',    name:'油腔液位',warnType:''},
        {id:'main_flq04_syw01',  x:'22%',y:'49%',w:'8%',h:'3%',data:'',  name:'水腔液位',warnType:''},
        {id:'main_jzgx05_jkyl01',x:'13%',y:'69%',w:'8%',h:'3%',data:'',name:'进口压力',warnType:''},
        {id:'main_jzgx05_jkwd01',x:'22%',y:'69%',w:'8%',h:'3%',data:'',name:'进口温度',warnType:''},
        {id:'main_flq05_yyw01',  x:'13%',y:'65%',w:'8%',h:'3%',data:'',name:'油腔液位',warnType:''},
        {id:'main_flq05_syw01',  x:'22%',y:'65%',w:'8%',h:'3%',data:'',name:'水腔液位',warnType:''},
        {id:'main_jzgx06_jkyl01',x:'13%',y:'87%',w:'8%',h:'3%',data:'',name:'进口压力',warnType:''},
        {id:'main_jzgx06_jkwd01',x:'22%',y:'87%',w:'8%',h:'3%',data:'',name:'进口温度',warnType:''},
        {id:'main_flq06_yyw01',  x:'13%',y:'83%',w:'8%',h:'3%',data:'', name:'油腔液位',warnType:''},
        {id:'main_flq06_syw01',  x:'22%',y:'83%',w:'8%',h:'3%',data:'', name:'水腔液位',warnType:''},
        {id:'main_flq01_qckyl01',x:'44%',y:'18%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_flq02_qckyl01',x:'44%',y:'32%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_flq03_qckyl01',x:'44%',y:'47%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_flq04_qckyl01',x:'44%',y:'62%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_flq05_qckyl01',x:'44%',y:'78%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_flq06_qckyl01',x:'44%',y:'95%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_flq01_yckwd01',  x:'61%', y:'4%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_flq01_sckll01',  x:'61%', y:'7%',w:'8%',h:'3%',data:'',name:'瞬时液量',warnType:''},
        {id:'main_flq01_yckll01',  x:'61%',y:'10%',w:'8%',h:'3%',data:'',name:'瞬时油量',warnType:''},
        {id:'main_flq01_qckll01',  x:'70%', y:'4%',w:'8%',h:'3%',data:'',name:'瞬时气量',warnType:''},
        {id:'main_flq01_scklllj01',x:'70%',  y:'7%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_flq01_ycklllj01',x:'79%',  y:'4%',w:'8%',h:'3%',data:'',name:'累计油量',warnType:''},
        {id:'main_flq01_qcklllj01',x:'79%',  y:'7%',w:'8%',h:'3%',data:'',name:'累计气量',warnType:''},
        {id:'main_flq02_yckwd01',  x:'61%',y:'19%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_flq02_sckll01',  x:'61%',y:'22%',w:'8%',h:'3%',data:'',name:'瞬时液量',warnType:''},
        {id:'main_flq02_yckll01',  x:'61%',y:'25%',w:'8%',h:'3%',data:'',name:'瞬时油量',warnType:''},
        {id:'main_flq02_qckll01',  x:'70%',y:'19%',w:'8%',h:'3%',data:'',name:'瞬时气量',warnType:''},
        {id:'main_flq02_scklllj01',x:'70%',y:'22%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_flq02_ycklllj01',x:'79%',y:'19%',w:'8%',h:'3%',data:'',name:'累计油量',warnType:''},
        {id:'main_flq02_qcklllj01',x:'79%',y:'22%',w:'8%',h:'3%',data:'',name:'累计气量',warnType:''},

        {id:'main_flq03_yckwd01',  x:'61%',y:'34%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_flq03_sckll01',  x:'61%',y:'37%',w:'8%',h:'3%',data:'',name:'瞬时液量',warnType:''},
        {id:'main_flq03_yckll01',  x:'61%',y:'40%',w:'8%',h:'3%',data:'',name:'瞬时油量',warnType:''},
        {id:'main_flq03_qckll01',  x:'70%',y:'34%',w:'8%',h:'3%',data:'',name:'瞬时气量',warnType:''},
        {id:'main_flq03_scklllj01',x:'70%',y:'37%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_flq03_ycklllj01',x:'79%',y:'34%',w:'8%',h:'3%',data:'',name:'累计油量',warnType:''},
        {id:'main_flq03_qcklllj01',x:'79%',y:'37%',w:'8%',h:'3%',data:'',name:'累计气量',warnType:''},

        {id:'main_flq04_yckwd01',  x:'61%',y:'50%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_flq04_sckll01',  x:'61%',y:'53%',w:'8%',h:'3%',data:'',name:'瞬时液量',warnType:''},
        {id:'main_flq04_yckll01',  x:'61%',y:'56%',w:'8%',h:'3%',data:'',name:'瞬时油量',warnType:''},
        {id:'main_flq04_qckll01',  x:'70%',y:'50%',w:'8%',h:'3%',data:'',name:'瞬时气量',warnType:''},
        {id:'main_flq04_scklllj01',x:'70%',y:'53%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_flq04_ycklllj01',x:'79%',y:'50%',w:'8%',h:'3%',data:'',name:'累计油量',warnType:''},
        {id:'main_flq04_qcklllj01',x:'79%',y:'53%',w:'8%',h:'3%',data:'',name:'累计气量',warnType:''},
        {id:'main_flq05_yckwd01',  x:'61%',y:'67%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_flq05_sckll01',  x:'61%',y:'70%',w:'8%',h:'3%',data:'',name:'瞬时液量',warnType:''},
        {id:'main_flq05_yckll01',  x:'61%',y:'73%',w:'8%',h:'3%',data:'',name:'瞬时油量',warnType:''},
        {id:'main_flq05_qckll01',  x:'70%',y:'67%',w:'8%',h:'3%',data:'',name:'瞬时气量',warnType:''},
        {id:'main_flq05_scklllj01',x:'70%',y:'70%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_flq05_ycklllj01',x:'79%',y:'67%',w:'8%',h:'3%',data:'',name:'累计油量',warnType:''},
        {id:'main_flq05_qcklllj01',x:'79%',y:'70%',w:'8%',h:'3%',data:'',name:'累计气量',warnType:''},
        {id:'main_flq06_yckwd01',  x:'61%',y:'85%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_flq06_sckll01',  x:'61%',y:'88%',w:'8%',h:'3%',data:'',name:'瞬时液量',warnType:''},
        {id:'main_flq06_yckll01',  x:'61%',y:'91%',w:'8%',h:'3%',data:'',name:'瞬时油量',warnType:''},
        {id:'main_flq06_qckll01',  x:'70%',y:'85%',w:'8%',h:'3%',data:'',name:'瞬时气量',warnType:''},
        {id:'main_flq06_scklllj01',x:'70%',y:'88%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_flq06_ycklllj01',x:'79%',y:'85%',w:'8%',h:'3%',data:'',name:'累计油量',warnType:''},
        {id:'main_flq06_qcklllj01',x:'79%',y:'88%',w:'8%',h:'3%',data:'',name:'累计气量',warnType:''},
        {id:'main_flqckgh_syl01',x:'88%',y:'36%',w:'8%',h:'3%',data:'',name:'汇管压力',warnType:''},
        {id:'main_flqckgh_yyl01',x:'88%',y:'56%',w:'8%',h:'3%',data:'',name:'汇管压力',warnType:''},
        {id:'main_flqckgh_qyl01',x:'88%',y:'85%',w:'8%',h:'3%',data:'',name:'汇管压力',warnType:''},
      ],
      rightData3:[//消防罐区
      {id:'main_xfg01_yw01',x:'8%',y:'25%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_xfg03_yw01',x:'42%',y:'25%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_xfb01_ckyl01',x:'69%',y:'8%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_xfb02_ckyl01',x:'69%',y:'34%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_xfb03_ckyl01',x:'69%',y:'58%',w:'8%',h:'3%',data:'', name:'压力',warnType:''},
        {id:'main_xfgx_yl01',x:'82%',y:'78%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
      ],
      rightData4:[//油罐区
         {id:'main_yjcjg01_yw01',x:'16%',y:'8%',w:'10%',h:'3%',data:'',name:'液位', warnType:''},
        {id:'main_yjcjg01_sw01',x:'16%',y:'11%',w:'10%',h:'3%',data:'',name:'油水界面',warnType:''},
        {id:'main_yjcjg01_yh01',x:'16%',y:'14%',w:'10%',h:'3%',data:'',name:'油高',warnType:''},
        {id:'main_yjcjg04_yw01',x:'16%',y:'45%',w:'10%',h:'3%',data:'',name:'液位', warnType:''},
        {id:'main_yjcjg04_sw01',x:'16%',y:'48%',w:'10%',h:'3%',data:'',name:'油水界面',warnType:''},
        {id:'main_yjcjg04_yh01',x:'16%',y:'51%',w:'10%',h:'3%',data:'',name:'油高',warnType:''},
        {id:'main_ejcjg02_yw01',x:'37%',y:'8%',w:'10%',h:'3%',data:'',name:'液位', warnType:''},
        {id:'main_ejcjg02_sw01',x:'37%',y:'11%',w:'10%',h:'3%',data:'',name:'油水界面',warnType:''},
        {id:'main_ejcjg02_yh01',x:'37%',y:'14%',w:'10%',h:'3%',data:'',name:'油高',warnType:''},
        {id:'main_ejcjg06_yw01',x:'37%',y:'45%',w:'10%',h:'3%',data:'',name:'液位', warnType:''},
        {id:'main_ejcjg06_sw01',x:'37%',y:'48%',w:'10%',h:'3%',data:'',name:'油水界面',warnType:''},
        {id:'main_ejcjg06_yh01',x:'37%',y:'51%',w:'10%',h:'3%',data:'',name:'油高',warnType:''},
        {id:'main_jhyg03_yw01',x:'58%',y:'8%',w:'10%',h:'3%',data:'',name:'液位', warnType:''},
        {id:'main_jhyg03_sw01',x:'58%',y:'11%',w:'10%',h:'3%',data:'',name:'油水界面',warnType:''},
        {id:'main_jhyg03_yh01',x:'58%',y:'14%',w:'10%',h:'3%',data:'',name:'油高',warnType:''},
        {id:'main_jhyg05_yw01',x:'58%',y:'45%',w:'10%',h:'3%',data:'',name:'液位', warnType:''},
        {id:'main_jhyg05_sw01',x:'58%',y:'48%',w:'10%',h:'3%',data:'',name:'油水界面',warnType:''},
        {id:'main_jhyg05_yh01',x:'58%',y:'51%',w:'10%',h:'3%',data:'',name:'油高',warnType:''},

      ],
      rightData5:[//污水处理
       {id:'main_lsgx01_sll01',x:'13%',y:'2%',w:'8%',h:'3%',data:'',name:'瞬时水量',warnType:''},
        {id:'main_lsgx01_slllj01',x:'13%',y:'7%',w:'8%',h:'3%',data:'',  name:'累计水量',warnType:''},
        {id:'main_glq01_ckyl01',x:'6%',y:'58%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsgx01_s9ll01',x:'22%',y:'58%',w:'8%',h:'3%',data:'',name:'瞬时水量',warnType:''},
        {id:'main_ccswsgx01_s9lllj01',x:'22%',y:'66%',w:'8%',h:'3%',data:'',  name:'累计水量',warnType:''},
        {id:'main_ccswsgx01_s5ll01',x:'9%',y:'76%',w:'8%',h:'3%',data:'', name:'瞬时水量',warnType:''},
        {id:'main_ccswsgx01_s5lllj01',x:'9%',y:'80%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_ccswsgx01_t3ll01',x:'18%',y:'90%',w:'8%',h:'3%',data:'', name:'瞬时水量',warnType:''},
        {id:'main_ccswsgx01_t3lllj01',x:'18%',y:'95%',w:'8%',h:'3%',data:'',name:'累计水量',warnType:''},
        {id:'main_ccswsb01_ckyl01',x:'34%',y:'22%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb01_pl01',  x:'34%',y:'26%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},
        {id:'main_ccswsb01_dy01',  x:'32%',y:'38%',w:'8%',h:'3%',data:'',name:'电压',warnType:''},
        {id:'main_ccswsb01_dl01',  x:'32%',y:'43%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},
        {id:'main_ccswsb02_ckyl01',x:'43%',y:'22%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb02_pl01',  x:'43%',y:'26%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},
        {id:'main_ccswsb02_dy01',  x:'42%',y:'38%',w:'8%',h:'3%',data:'',name:'电压',warnType:''},
        {id:'main_ccswsb02_dl01',  x:'42%',y:'46%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},
        {id:'main_ccswsb03_ckyl01',x:'53%',y:'22%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb03_pl01',  x:'53%',y:'26%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},
        {id:'main_ccswsb03_dy01',  x:'51%',y:'38%',w:'8%',h:'3%',data:'',name:'电压',warnType:''},
        {id:'main_ccswsb03_dl01',  x:'51%',y:'43%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},
        {id:'main_ccswsb04_ckyl01',x:'63%',y:'22%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_ccswsb04_pl01',  x:'63%',y:'26%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},
        {id:'main_ccswsb04_dy01',  x:'61%',y:'38%',w:'8%',h:'3%',data:'',name:'电压',warnType:''},
        {id:'main_ccswsb04_dl01',  x:'61%',y:'43%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},
        {id:'main_ccswsgx01_yl01',x:'32%',y:'52%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_cyg01_yw01',x:'72%',y:'7%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_cyg02_yw01',x:'85%',y:'7%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_cjg03_yw01',x:'72%',y:'25%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_cjg04_yw01',x:'85%',y:'25%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_hcg05_yw01',x:'72%',y:'44%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_hcg06_yw01',x:'85%',y:'44%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_sgg01_kg01',x:'64%',y:'72%',w:'8%',h:'3%',data:'',name:'空高',warnType:''},
        {id:'main_sgg01_yw01',x:'64%',y:'75%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
        {id:'main_sgg02_kg01',x:'92%',y:'72%',w:'8%',h:'3%',data:'',name:'空高',warnType:''},
        {id:'main_sgg02_yw01',x:'92%',y:'75%',w:'8%',h:'3%',data:'',name:'液位',warnType:''},
      ],
      rightData6:[//油泵换热器区
        {id:'main_tsb01_ckyl01',x:'13%',y:'10%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_tsb01_dy01',x:'10%',y:'29%',w:'8%',h:'3%',data:'',  name:'电压',warnType:''},
        {id:'main_tsb01_dl01',x:'10%',y:'35%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},
        {id:'main_tsb03_ckyl01',x:'33%',y:'6%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_tsb03_pl01',x:'33%',y:'10%',w:'8%',h:'3%',data:'',  name:'频率',warnType:''},
        {id:'main_tsb03_dy01',x:'33%',y:'30%',w:'8%',h:'3%',data:'',  name:'电压',warnType:''},
        {id:'main_tsb03_dl01',x:'33%',y:'34%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},

        {id:'main_zqhrq_jkwd01',x:'51%',y:'6%',w:'8%',h:'3%',data:'',name:'进口温度',warnType:''},
        {id:'main_zqhrq_jkyl01',x:'51%',y:'10%',w:'8%',h:'3%',data:'',name:'进口压力',warnType:''},
        {id:'main_zqhrq_ckwd01',x:'90%',y:'29%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_zqhrq_ckyl01',x:'90%',y:'39%',w:'8%',h:'3%',data:'',name:'出口压力',warnType:''},
        // {id:'main_trqflq01_yw01',x:'3%',y:'47%',w:'8%',h:'3%',data:'',name:'总外输温度',warnType:''},//wei
        {id:'main_yyhg01_ckwd01',x:'45%',y:'36%',w:'8%',h:'3%',data:'',name:'出口温度',warnType:''},
        {id:'main_yyhg01_yl01',x:'45%',y:'40%',w:'8%',h:'3%',data:'',name:'汇管压力',warnType:''},
        // {id:'main_trqflq01_yw01',x:'20%',y:'46%',w:'8%',h:'3%',data:'', name:'瞬时',warnType:''},
        // {id:'main_trqflq01_yw01',x:'20%',y:'53%',w:'8%',h:'3%',data:'',name:'累计',warnType:''},
        // {id:'main_trqflq01_yw01',x:'32%',y:'46%',w:'8%',h:'3%',data:'',name:'瞬时',warnType:''},
        // {id:'main_trqflq01_yw01',x:'32%',y:'53%',w:'8%',h:'3%',data:'',name:'累计',warnType:''},
        // {id:'main_trqflq01_yw01',x:'20%',y:'85%',w:'8%',h:'3%',data:'', name:'瞬时',warnType:''},
        // {id:'main_trqflq01_yw01',x:'20%',y:'95%',w:'8%',h:'3%',data:'',name:'累计',warnType:''},
        {id:'main_yywsb02_ckyl01',x:'55%',y:'46%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_yywsb02_pl01',  x:'55%',y:'49%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},
        {id:'main_yywsb03_ckyl01',x:'65%',y:'46%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_yywsb03_pl01',  x:'65%',y:'49%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},
        {id:'main_yywsb04_ckyl01',x:'81.5%',y:'46%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_yywsb04_pl01',  x:'81.5%',y:'49%',w:'8%',h:'3%',data:'',name:'频率',warnType:''},

        {id:'main_yywsb03_dy01',x:'67%',y:'63%',w:'8%',h:'3%',data:'',name:'2#3#电压',warnType:''},//wei
        {id:'main_yywsb03_dl01',x:'67%',y:'66%',w:'8%',h:'3%',data:'',name:'2#3#电流',warnType:''},//wei
        {id:'main_yywsb04_dy01',x:'79%',y:'63%',w:'8%',h:'3%',data:'',name:'电压',warnType:''},
        {id:'main_yywsb04_dl01',x:'79%',y:'66%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},
      //   {id:'main_trqflq01_qckyl01',x:'79%',y:'83%',w:'8%',h:'3%',data:'',name:'瞬时',warnType:''},
      //   {id:'main_trqflq01_qckyl01',x:'79%',y:'86%',w:'8%',h:'3%',data:'',name:'累计',warnType:''},
      //   {id:'main_trqflq01_qckyl01',x:'79%',y:'93%',w:'8%',h:'3%',data:'',name:'瞬时',warnType:''},
      //   {id:'main_trqflq01_qckyl01',x:'79%',y:'96%',w:'8%',h:'3%',data:'',name:'累计',warnType:''},
      ],
      rightData7:[//大罐收气区
      {id:'main_jkflq01_jkyl01',x:'9%',y:'45%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
        {id:'main_jkflq01_jkyl011',x:'55%',y:'41%',w:'8%',h:'3%',data:'',name:'电压',warnType:''},//wei
        {id:'main_jkflq01_jkyl011',x:'55%',y:'44%',w:'8%',h:'3%',data:'',name:'电流',warnType:''},//wei
        {id:'main_jkflq01_ckyl01',x:'81%',y:'65%',w:'8%',h:'3%',data:'',name:'压力',warnType:''},
      ],
      rightData8:[//污水加药
        {id:'main_fsj01_yw01',  x:'7.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj01_syyl01',x:'7.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj01_ddl01', x:'7.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj02_yw01',  x:'17.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj02_syyl01',x:'17.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj02_ddl01', x:'17.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj03_yw01',  x:'27.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj03_syyl01',x:'27.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj03_ddl01', x:'27.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj04_yw01',  x:'38.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj04_syyl01',x:'38.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj04_ddl01', x:'38.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj05_yw01',  x:'48.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj05_syyl01',x:'48.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj05_ddl01', x:'48.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj06_yw01',  x:'58.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj06_syyl01',x:'58.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj06_ddl01', x:'58.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj07_yw01',  x:'68.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj07_syyl01',x:'68.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj07_ddl01', x:'68.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
        {id:'main_fsj08_yw01',  x:'78.5%',y:'30%',w:'8%',h:'3%',data:'', name:'即时液位' , warnType:''},
        {id:'main_fsj08_syyl01',x:'78.5%',y:'34%',w:'8%',h:'3%',data:'',name:'剩余药量',  warnType:''},
        {id:'main_fsj08_ddl01', x:'78.5%',y:'38%',w:'8%',h:'3%',data:'', name:'即时电导率',warnType:''},
      ],
      inspectImgData:[      //流程巡检设备位置图
        {imgSrc:require('../../assets/tuoer/sanxiang.png'),unityId:'main_flqq_flq01',sort:'',x:'12.4%',y:'11.8%',w:'7.5%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/sanxiang.png'),unityId:'main_flqq_flq02',sort:'',x:'12.4%',y:'18.5%',w:'7.5%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/sanxiang.png'),unityId:'main_flqq_flq03',sort:'',x:'12.4%',y:'25.3%',w:'7.5%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/sanxiang.png'),unityId:'main_flqq_flq04',sort:'',x:'12.4%',y:'32.1%',w:'7.5%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/sanxiang.png'),unityId:'main_flqq_flq05',sort:'',x:'12.4%',y:'39.6%',w:'7.5%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/sanxiang.png'),unityId:'main_flqq_flq06',sort:'',x:'12.4%',y:'47.5%',w:'7.5%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_ygq_cjg01',sort:'',x:'31.2%',y:'10.4%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_ygq_cjg02',sort:'',x:'41.9%',y:'10.2%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_ygq_jhyg03',sort:'',x:'54.1%',y:'10%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_ygq_cjg04',sort:'',x:'31%',y:'28.5%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_ygq_jhyg06',sort:'',x:'42.3%',y:'28.7%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_ygq_cjg05',sort:'',x:'54.3%',y:'28.5%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_xfgq_xfg01',sort:'',x:'76.9%',y:'8.7%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_xfgq_xfg02',sort:'',x:'84.5%',y:'8.7%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_xfgq_xfg03',sort:'',x:'92.1%',y:'8.7%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_wsgq_cyg01',sort:'',x:'76.9%',y:'26%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_wsgq_cjg03',sort:'',x:'76.9%',y:'41.2%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_wsgq_hcg05',sort:'',x:'76.9%',y:'57.2%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_sggq_sgg01',sort:'',x:'76.9%',y:'74.5%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_wsgq_cyg02',sort:'',x:'89.2%',y:'26%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_wsgq_cjg04',sort:'',x:'89.2%',y:'41.2%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_wsgq_hcg06',sort:'',x:'89.2%',y:'57.2%',w:'5.4%',h:'10.5%'},
        {imgSrc:require('../../assets/tuoer/gt.png'),unityId:'main_sggq_sgg02',sort:'',x:'89.2%',y:'74.5%',w:'5.4%',h:'10.5%'},
        // {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'zsj_zsq_wsb03',sort:'',x:'56.1%',y:'8.5%',w:'3.1%',h:'4.7%'},
        // {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'zsj_zsq_zsb01',sort:'',x:'56.1%',y:'18.4%',w:'3.1%',h:'4.7%'},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'yywsbf_yywsbfq_tsb01',sort:'',x:'30.7%',y:'51.8%',w:'3.8%',h:'4.5%'},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'yywsbf_yywsbfq_tsb02',sort:'',x:'36.3%',y:'51.8%',w:'3.8%',h:'4.5%'},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'yywsbf_yywsbfq_tsb03',sort:'',x:'42.2%',y:'51.8%',w:'3.8%',h:'4.5%'},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'yywsbf_yywsbfq_yywsb01',sort:'',x:'31.4%',y:'69%',w:'4.1%',h:'4.8%',x1:'34%',y1:'70.2%',name:"1#原油外输泵"},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'yywsbf_yywsbfq_yywsb04',sort:'',x:'52.7%',y:'69%',w:'4.1%',h:'4.8%',x1:'55.2%',y1:'70.2%',name:"4#原油外输泵"},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'yywsbf_yywsbfq_yywsb05',sort:'',x:'59.5%',y:'69%',w:'4.1%',h:'4.8%',x1:'62%',y1:'70.2%',name:"5#原油外输泵"},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'ccsbf_ccsbfq_ccswsb01',sort:'',x:'45.1%',y:'82%',w:'3.7%',h:'5.4%',x1:'47.5%',y1:'83.5%',name:"1#污水外输泵"},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'ccsbf_ccsbfq_ccswsb02',sort:'',x:'52.1%',y:'82%',w:'3.7%',h:'5.4%',x1:'54.5%',y1:'83.5%',name:"2#污水外输泵"},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'ccsbf_ccsbfq_ccswsb03',sort:'',x:'58.6%',y:'82%',w:'3.7%',h:'5.4%',x1:'61%',y1:'83.5%',name:"3#污水外输泵"},
        {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'ccsbf_ccsbfq_ccswsb04',sort:'',x:'65.6%',y:'82%',w:'3.7%',h:'5.4%',x1:'68%',y1:'83.5%',name:"4#污水外输泵"},
        // {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'main_flqq_flq01',sort:'',x:'23.2%',y:'88.5%',w:'2.7%',h:'3.4%'},
        // {imgSrc:require('../../assets/tuoer/wsts.png'),unityId:'main_flqq_flq01',sort:'',x:'23.2%',y:'94.1%',w:'2.7%',h:'3.4%'},
        {imgSrc:require('../../assets/tuoer/tsb.png'),unityId:'yywsbf_yywsbfq_yywsb02',sort:'',x:'38.8%',y:'68.8%',w:'3.7%',h:'5.4%',x1:'39.5%',y1:'70.2%',name:"2#原油外输泵"},
        {imgSrc:require('../../assets/tuoer/tsb.png'),unityId:'yywsbf_yywsbfq_yywsb03',sort:'',x:'45.5%',y:'68.8%',w:'3.7%',h:'5.4%',x1:'46.2%',y1:'70.3%',name:"3#原油外输泵"},
        {imgSrc:require('../../assets/tuoer/tsb.png'),unityId:'sgshsbf_sgshsbfq_sgshsb01',sort:'',x:'81.6%',y:'88.2%',w:'3.5%',h:'3.8%'},
        {imgSrc:require('../../assets/tuoer/tsb.png'),unityId:'sgshsbf_sgshsbfq_sgshsb02',sort:'',x:'81.6%',y:'93.4%',w:'3.5%',h:'3.8%'},
        // {imgSrc:require('../../assets/tuoer/jrl.png'),unityId:'main_flqq_flq01',sort:'',x:'63.5%',y:'46%',w:'4.3%',h:'8.6%'},
        // {imgSrc:require('../../assets/tuoer/jrl.png'),unityId:'main_flqq_flq01',sort:'',x:'1.9%',y:'57.5%',w:'4.3%',h:'8.6%'},
        {imgSrc:require('../../assets/tuoer/gl.png'),unityId:'main_glq_glq01',sort:'',x:'31.4%',y:'78.5%',w:'6%',h:'8.6%'},
        {imgSrc:require('../../assets/tuoer/hrq.png'),unityId:'main_zqhrq_ckgx01',sort:'',x:'56.1%',y:'52.5%',w:'6%',h:'7%'},
        {imgSrc:require('../../assets/tuoer/hrq.png'),unityId:'main_zqhrq_jkgx01',sort:'',x:'47%',y:'52.4%',w:'6%',h:'7%'},
        // {imgSrc:require('../../assets/tuoer/exflq.png'),unityId:'main_flqq_flq01',sort:'',x:'12%',y:'59%',w:'5.8%',h:'8%'},
        // {imgSrc:require('../../assets/tuoer/dgsq.png'),unityId:'main_flqq_flq01',sort:'',x:'18.8%',y:'59.2%',w:'5.6%',h:'8%'},
        {imgSrc:require('../../assets/tuoer/jzgx.png'),unityId:'main_lyq_jzgx01',sort:'',x:'3.7%',y:'14.2%',w:'1.6%',h:'4%'},
        {imgSrc:require('../../assets/tuoer/jzgx.png'),unityId:'main_lyq_jzgx02',sort:'',x:'3.7%',y:'21.1%',w:'1.6%',h:'4%'},
        {imgSrc:require('../../assets/tuoer/jzgx.png'),unityId:'main_lyq_jzgx03',sort:'',x:'3.7%',y:'27.7%',w:'1.6%',h:'4%'},
        {imgSrc:require('../../assets/tuoer/jzgx.png'),unityId:'main_lyq_jzgx04',sort:'',x:'3.7%',y:'34.5%',w:'1.6%',h:'4%'},
        {imgSrc:require('../../assets/tuoer/jzgx.png'),unityId:'main_lyq_jzgx05',sort:'',x:'3.7%',y:'41.7%',w:'1.6%',h:'4%'},
        {imgSrc:require('../../assets/tuoer/jzgx.png'),unityId:'main_lyq_jzgx06',sort:'',x:'3.7%',y:'49.7%',w:'1.6%',h:'4%'},

      ],
      maskY:[   //分离区遮罩
        {imgSrc:require('../../assets/hailiuerwei/yg.png'),unityId:'main_wsgq_60wsg01',sort:'',x:'9.9%',y:'20.7%',w:'5.8%',h:'12.1%'},
        {imgSrc:require('../../assets/hailiuerwei/yg.png'),unityId:'main_wsgq_60wsg02',sort:'',x:'9.9%',y:'72.5%',w:'5.8%',h:'12.1%'},
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_gtq_100fcxg01',sort:'',x:'21.4%',y:'18.7%',w:'6.8%',h:'14.1%'},
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_gtq_100hcg01',sort:'',x:'48.8%',y:'18.7%',w:'6.8%',h:'14.1%'},
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_gtq_300cyg01',sort:'',x:'34.9%',y:'71.6%',w:'6.8%',h:'14.1%'},
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_gtq_500hncjg01',sort:'',x:'33.9%',y:'14.6%',w:'8.9%',h:'19%'},
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_gtq_500zsg01',sort:'',x:'61.2%',y:'66.6%',w:'8.9%',h:'19%'},
        {imgSrc:require('../../assets/hailiuerwei/zsb.png'),unityId:'zsj_zsq_zsb01',sort:'',x:'85.7%',y:'21%',w:'7.9%',h:'10%'},
        {imgSrc:require('../../assets/hailiuerwei/zsb.png'),unityId:'zsj_zsq_zsb02',sort:'',x:'85.7%',y:'47%',w:'7.9%',h:'10%'},
        {imgSrc:require('../../assets/hailiuerwei/zsb.png'),unityId:'zsj_zsq_zsb03',sort:'',x:'85.7%',y:'73%',w:'7.9%',h:'10%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'zsj_zsq_wsb01',sort:'',x:'76.5%',y:'26%',w:'4.7%',h:'5.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'zsj_zsq_wsb02',sort:'',x:'76.5%',y:'51.6%',w:'4.7%',h:'5.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'zsj_zsq_wsb03',sort:'',x:'76.5%',y:'77.4%',w:'4.7%',h:'5.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'tsbf_tsbfq_tsb01',sort:'',x:'47.5%',y:'62.4%',w:'4.7%',h:'5.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'tsbf_tsbfq_tsb02',sort:'',x:'47.5%',y:'78.4%',w:'4.7%',h:'5.7%'},
        {imgSrc:require('../../assets/hailiuerwei/gl.png'),unityId:'main_glq_jgs01',sort:'',x:'61%',y:'16.7%',w:'10%',h:'15.2%'},
        {imgSrc:require('../../assets/hailiuerwei/gl.png'),unityId:'main_glq_jgs02',sort:'',x:'61%',y:'16.7%',w:'10%',h:'15.2%'},
        {imgSrc:require('../../assets/hailiuerwei/sc.png'),unityId:'main_wycq_wyc01',sort:'',x:'21%',y:'77.7%',w:'8%',h:'7.2%'},
        ],
      maskX:[   //消防罐区遮罩层
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_yyhcq_hcg01',sort:'',x:'12.7%',y:'78.7%',w:'7.3%',h:'15.8%'},
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'main_yyhcq_hcg02',sort:'',x:'39.7%',y:'78.7%',w:'7.3%',h:'15.8%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq01',sort:'',x:'19%',y:'12.4%',w:'18.3%',h:'15.8%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq02',sort:'',x:'19%',y:'45%',w:'18.3%',h:'15.8%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq03',sort:'',x:'69%',y:'12.4%',w:'18.3%',h:'15.8%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq04',sort:'',x:'69%',y:'45%',w:'18.3%',h:'15.8%'},
        {imgSrc:require('../../assets/hailiuerwei/wsb.png'),unityId:'main_yywsq_wsb02',sort:'',x:'59%',y:'84.4%',w:'6.3%',h:'9.8%'},
        {imgSrc:require('../../assets/hailiuerwei/wsb.png'),unityId:'main_yywsq_wsb01',sort:'',x:'59%',y:'70.8%',w:'6.3%',h:'9.8%'},
        {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jrl01',sort:'',x:'46.4%',y:'14%',w:'12.3%',h:'14.8%'},
        {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jrl02',sort:'',x:'46.4%',y:'46.3%',w:'12.3%',h:'14.8%'},

      ],
      maskW:[   //油罐区的遮罩层
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq01',sort:'',x:'14.5%',y:'10.3%',w:'26%',h:'22%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq02',sort:'',x:'14.5%',y:'56.3%',w:'26%',h:'22%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq03',sort:'',x:'60.3%',y:'10.3%',w:'26%',h:'22%'},
        {imgSrc:require('../../assets/hailiuerwei/sanxiang.png'),unityId:'main_flqq_flq04',sort:'',x:'60.3%',y:'56.3%',w:'26%',h:'22%'},

      ],
      mask7:[
        {imgSrc:require('../../assets/hailiuerwei/gl.png'),unityId:'main_glq_jgs01',sort:'',x:'48.4%',y:'11.3%',w:'31.5%',h:'39.2%'},
        {imgSrc:require('../../assets/hailiuerwei/gl.png'),unityId:'main_glq_jgs02',sort:'',x:'48.4%',y:'11.3%',w:'31.5%',h:'39.2%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'tsbf_tsbfq_tsb01',sort:'',x:'6.7%',y:'34%',w:'14.3%',h:'14.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'tsbf_tsbfq_tsb02',sort:'',x:'6.7%',y:'77.5%',w:'14.3%',h:'14.7%'},
      ],
      mask8:[
        {imgSrc:require('../../assets/hailiuerwei/wsb.png'),unityId:'main_yywsq_wsb01',sort:'',x:'26.5%',y:'18.5%',w:'15.8%',h:'22%'},
        {imgSrc:require('../../assets/hailiuerwei/wsb.png'),unityId:'main_yywsq_wsb02',sort:'',x:'26.5%',y:'65.4%',w:'15.8%',h:'22%'},
      ],
      mask9:[
        {imgSrc:require('../../assets/hailiuerwei/zsb.png'),unityId:'zsj_zsq_zsb01',sort:'',x:'54.7%',y:'18.5%',w:'16%',h:'20.5%'},
        {imgSrc:require('../../assets/hailiuerwei/zsb.png'),unityId:'zsj_zsq_zsb02',sort:'',x:'54.7%',y:'48.4%',w:'16%',h:'20.5%'},
        {imgSrc:require('../../assets/hailiuerwei/zsb.png'),unityId:'zsj_zsq_zsb03',sort:'',x:'54.7%',y:'74.9%',w:'16%',h:'20.5%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'zsj_zsq_wsb01',sort:'',x:'10%',y:'27%',w:'10.2%',h:'11.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'zsj_zsq_wsb02',sort:'',x:'10%',y:'57%',w:'10.2%',h:'11.7%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'zsj_zsq_wsb03',sort:'',x:'10%',y:'83.7%',w:'10.2%',h:'11.7%'},
      ],
      mask10:[
        {imgSrc:require('../../assets/hailiuerwei/gt.png'),unityId:'cnbf_cnq_rhsx01',sort:'',x:'7.9%',y:'64.3%',w:'13.8%',h:'26.1%'},
        // {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'main_jrlq_jzgx',sort:'1',x:'27%',y:'64%',w:'8.8%',h:'8.5%'},//1号补水泵
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'cnbf_cnq_cnb01',sort:'1',x:'70%',y:'34.5%',w:'13%',h:'13%'},
        {imgSrc:require('../../assets/hailiuerwei/tsb.png'),unityId:'cnbf_cnq_cnb02',sort:'1',x:'70%',y:'68%',w:'13%',h:'13%'},
        // {imgSrc:require('../../assets/hailiuerwei/wsts.png'),unityId:'main_jrlq_jzgx',sort:'2',x:'45.5%',y:'64%',w:'8.8%',h:'8.5%'},//2号补水泵
      ],
      mask11:[//加药装置
        // {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jzgx',sort:'',x:'16%',y:'17.3%',w:'20.8%',h:'25.8%'},
      ],
      mask12:[ //加热炉
        {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jrl01',sort:'',x:'16%',y:'17.3%',w:'20.8%',h:'25.8%'},//加热炉油路
        {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jrl02',sort:'',x:'61%',y:'17.3%',w:'20.8%',h:'25.8%'},
        {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jrl01',sort:'',x:'16%',y:'59%',w:'20.8%',h:'25.8%'},//加热炉水路
        {imgSrc:require('../../assets/hailiuerwei/jrl.png'),unityId:'main_jrlq_jrl02',sort:'',x:'61%',y:'59%',w:'20.8%',h:'25.8%'},
      ],
      animateArr:[],
      isShow:0,
      deviceData: [],
      isClick: false,
      firstEleIsClick:true ,     //开始巡检的第一个元素的进度条是否展示
      thresholdParameter:false,   //阈值弹窗
      attrArr:[
        {
          leftRangesStr:"", //左侧合理值 1
          rightRangesStr: "",  //右侧合理值 1
          minWarningValue: "",  //低  1
          minminWarningValue: "",  //低低  1
          maxWarningValue: "",  //高  1
          maxmaxWarningValue: "",  //高高  1
          trendValuesStr: "",  //趋势报警值  1
          // descValuesStr: "",  //仪表描述  1,
          meterThresholdValue: "" ,  //报警阈值
          meterName:'',  //仪表名称
          meterNumber:"",
          id:""
        }
      ],
      meterNumber:[],   //实时数据
      setTimer:null,      //自定义巡检的定时器
      clientW:document.body.clientWidth,
      clientH:document.body.clientHeight,
      reFreshA:true,
      reFreshB:true,
      seen:"666",
      num:{
        num1:1,num2:2,num3:3,num4:4,num5:5,num6:6,num7:7,num8:8,num9:9,num10:10,num11:11,num12:12
      },
      maskPotListJ2:[     //界面     三项分离器
        {id:'main_flq01_syw01',x:'33%',y:'87.5%',w:"13%",h:'0%'},//三项
        {id:'main_flq02_syw01',x:'33%',y:'73%',w:"13%",h:'0%'},//三项
        {id:'main_flq03_syw01',x:'33%',y:'58%',w:"13%",h:'0%'},//三项
        {id:'main_flq04_syw01',x:'33%',y:'43%',w:"13%",h:'0%'},//三项
        {id:'main_flq05_syw01',x:'33%',y:'27%',w:"13%",h:'0%'},//三项
        {id:'main_flq06_syw01',x:'33%',y:'10%',w:"13%",h:'0%'},//三项
      ],
      maskPotListJ4:[
        {id:'main_yjcjg01_sw01',x:'17.2%',y:'65%',w:"6.7%",h:'0%'},
        {id:'main_yjcjg04_sw01',x:'17.2%',y:'26.3%',w:"6.7%",h:'0%'},
        {id:'main_ejcjg02_sw01',x:'38.2%',y:'65%',w:"6.7%",h:'0%'},
        {id:'main_ejcjg06_sw01',x:'38.2%',y:'26.3%',w:"6.7%",h:'0%'},
        {id:'main_jhyg03_sw01',x:'59.4%',y:'65%',w:"6.7%",h:'0%'},
        {id:'main_jhyg05_sw01',x:'59.4%',y:'26.3%',w:"6.7%",h:'0%'},
      ],
      maskPotListJ:[     //界面     三项分离器
        {id:'main_flq01_syw01',x:'13.1%',y:'83%', w:"5.6%",h:'0%'},//三项
        {id:'main_flq02_syw01',x:'13.1%',y:'76.1%', w:"5.6%",h:'0%'},//三项
        {id:'main_flq03_syw01',x:'13.1%',y:'69.5%', w:"5.6%",h:'0%'},//三项
        {id:'main_flq04_syw01',x:'13.1%',y:'62.7%', w:"5.6%",h:'0%'},//三项
        {id:'main_flq05_syw01',x:'13.1%',y:'55.2%', w:"5.6%",h:'0%'},//三项
        {id:'main_flq06_syw01',x:'13.1%',y:'47.2%', w:"5.6%",h:'0%'},//三项
        {id:'main_yjcjg01_sw01',x:'31.8%',y:'80.5%', w:"4.2%",h:'0%'},//一级
        {id:'main_yjcjg04_sw01',x:'31.6%',y:'62.2%', w:"4.2%",h:'0%'},//一级
        {id:'main_ejcjg02_sw01',x:'42.6%',y:'80.8%', w:"4.2%",h:'0%'},//二级
        {id:'main_ejcjg06_sw01',x:'42.9%',y:'62.2%', w:"4.2%",h:'0%'},//二级
        {id:'main_jhyg03_sw01',x:'54.7%',y:'81%', w:"4.2%",h:'0%'},//净化油罐
        {id:'main_jhyg05_sw01',x:'54.9%',y:'62.2%', w:"4.2%",h:'0%'},//净化油罐
      ],
      maskPotListW:[     //水位图
        {id:'main_xfg01_yw01',x:'77.5%',y:'82.6%',w:"4.1%",h:'0%',c:'1'},//消防罐区
        {id:'main_xfg02_yw01',x:'85.2%',y:'82.6%', w:"4.1%",h:'0%',c:'1'},
        {id:'main_xfg03_yw01',x:'92.7%',y:'82.6%', w:"4.1%",h:'0%',c:'1'},
        {id:'main_cyg01_yw01',x:'77.5%',y:'65.2%', w:"4.2%",h:'0%',c:'1'},//1#
        {id:'main_cyg02_yw01',x:'89.8%',y:'65.2%', w:"4.2%",h:'0%',c:'1'},//2#
        {id:'main_cjg03_yw01',x:'77.5%',y:'49.6%', w:"4.2%",h:'0%',c:'1'},//3#
        {id:'main_cjg04_yw01',x:'89.8%',y:'49.6%', w:"4.2%",h:'0%',c:'1'},//4#
        {id:'main_hcg05_yw01',x:'77.6%',y:'34%', w:"4.2%",h:'0%',c:'1'},//5#
        {id:'main_hcg06_yw01',x:'89.8%',y:'34%', w:"4.2%",h:'0%',c:'1'},//6#
        {id:'main_sgg01_yw01',x:'77.6%',y:'16.6%', w:"4.2%",h:'0%',c:'1'},//污水事故
        {id:'main_sgg02_yw01',x:'89.8%',y:'16.6%', w:"4.2%",h:'0%',c:'1'},//污水事故
        {id:'main_yjcjg01_yw01',x:'31.8%',y:'80.5%', w:"4.2%",h:'0%'},//一级
        {id:'main_yjcjg04_yw01',x:'31.6%',y:'62.2%', w:"4.2%",h:'0%'},//一级
        {id:'main_ejcjg02_yw01',x:'42.6%',y:'80.8%', w:"4.2%",h:'0%'},//二级
        {id:'main_ejcjg06_yw01',x:'42.9%',y:'62.2%', w:"4.2%",h:'0%'},//二级
        {id:'main_jhyg03_yw01',x:'54.7%',y:'81%', w:"4.2%",h:'0%'},//净化油罐
        {id:'main_jhyg05_yw01',x:'54.9%',y:'62.2%', w:"4.2%",h:'0%'},//净化油罐
        {id:'main_flq01_yyw01',x:'13.1%',y:'83%', w:"5.6%",h:'0%',h1:'2.5%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq02_yyw01',x:'13.1%',y:'76.1%', w:"5.6%",h:'0%',h1:'2.5%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq03_yyw01',x:'13.1%',y:'69.5%', w:"5.6%",h:'0%',h1:'2.5%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq04_yyw01',x:'13.1%',y:'62.7%', w:"5.6%",h:'0%',h1:'2.5%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq05_yyw01',x:'13.1%',y:'55.2%', w:"5.6%",h:'0%',h1:'2.5%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq06_yyw01',x:'13.1%',y:'47.2%', w:"5.6%",h:'0%',h1:'2.5%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
      ],
      maskPotListW2:[
        {id:'main_flq01_yyw01',x:'33%',y:'87.5%',w:"13%",h:'0%',h1:'6%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq02_yyw01',x:'33%',y:'73%',w:"13%",h:'0%',h1:'6%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq03_yyw01',x:'33%',y:'58%',w:"13%",h:'0%',h1:'6%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq04_yyw01',x:'33%',y:'43%',w:"13%",h:'0%',h1:'6%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq05_yyw01',x:'33%',y:'27%',w:"13%",h:'0%',h1:'6%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
        {id:'main_flq06_yyw01',x:'33%',y:'10%',w:"13%",h:'0%',h1:'6%',srcimg:require('../../assets/tuoer/gtls.png')},//三项
      ],
      maskPotListW3:[       //消防罐区
        {id:'main_xfg01_yw01',x:'7.5%',y:'48%',w:"8.7%",h:'0%'},
        {id:'main_xfg02_yw01',x:'25.8%',y:'49%',w:"7%",h:'0%'},
        {id:'main_xfg03_yw01',x:'42.2%',y:'48.5%',w:"7%",h:'0%'},
      ],
      maskPotListW4:[       //油罐区
        {id:'main_yjcjg01_yw01',x:'17.2%',y:'65%',w:"6.7%",h:'0%'},
        {id:'main_yjcjg04_yw01',x:'17.2%',y:'26.3%',w:"6.7%",h:'0%'},
        {id:'main_ejcjg02_yw01',x:'38.2%',y:'65%',w:"6.7%",h:'0%'},
        {id:'main_ejcjg06_yw01',x:'38.2%',y:'26.3%',w:"6.7%",h:'0%'},
        {id:'main_jhyg03_yw01',x:'59.4%',y:'65%',w:"6.7%",h:'0%'},
        {id:'main_jhyg05_yw01',x:'59.4%',y:'26.3%',w:"6.7%",h:'0%'},
      ],
      maskPotListW5:[       //污水处理区
        {id:'main_cyg01_yw01',x:'73.2%',y:'80%',w:"5.5%",h:'0%'},
        {id:'main_cyg02_yw01',x:'73.2%',y:'61.5%',w:"5.5%",h:'0%'},
        {id:'main_cjg03_yw01',x:'73.2%',y:'42.2%',w:"5.5%",h:'0%'},
        {id:'main_cjg04_yw01',x:'73.2%',y:'20.6%',w:"5.5%",h:'0%'},
        {id:'main_hcg05_yw01',x:'86.3%',y:'80%',w:"5.5%",h:'0%'},
        {id:'main_hcg06_yw01',x:'86.3%',y:'61%',w:"5.5%",h:'0%'},
        {id:'main_sgg01_yw01',x:'86.3%',y:'42.4%',w:"5.5%",h:'0%'},
        {id:'main_sgg02_yw01',x:'86.3%',y:'20.6%',w:"5.5%",h:'0%'},
      ]
    }
  },
  async mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientW = document.body.clientWidth;
        that.clientW = window.clientW;
        window.clientH = document.body.clientHeight
        that.clientH = window.clientH
      })()
    }
    //获取所有设备仪器,获取到巡检时间
   await this.$http.get(`/admin/device/findAllInspection?t=${Math.random()}`)
        .then((res) => {
          if(res.code === 200) {
            if(res.data){
              this.animateArr = res.data;
              for (let i = 0; i < this.inspectImgData.length; i++) {
                  for (let j = 0; j < this.animateArr.length; j++) {
                    if(this.animateArr[j].unityId === this.inspectImgData[i].unityId) {
                      this.animateArr[j].imgSrc = this.inspectImgData[i].imgSrc;
                      this.animateArr[j].x = this.inspectImgData[i].x;
                      this.animateArr[j].x1 = this.inspectImgData[i].x1;
                      this.animateArr[j].y = this.inspectImgData[i].y;
                      this.animateArr[j].y1 = this.inspectImgData[i].y1;
                      this.animateArr[j].w = this.inspectImgData[i].w;
                      this.animateArr[j].h = this.inspectImgData[i].h;
                      this.animateArr[j].name = this.inspectImgData[i].name;
                    }
                  }
                }
            } else {
              console.log('没有数据')
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      this.getInspectionTime(this.maskY);
      this.getInspectionTime(this.maskX);
      this.getInspectionTime(this.maskW);
    //获取当前仪器数据
    this.$http.get("/admin/meter/findMeterAll")
        .then((res) => {
          if(res.code === 200) {
              this.rightData = res.data
              for (let i = 0; i < res.data.length; i++){
                for (let j = 0; j < this.rightDataZ.length; j++) {
                  if(res.data[i].meterNum === this.rightDataZ[j].id){
                    this.rightDataZ[j].data = res.data[i].value;
                    this.rightDataZ[j].unit = res.data[i].unit;
                    this.rightDataZ[j].warnType = res.data[i].warnType;
                    this.rightDataZ[j].isShow = res.data[i].isShow;
                  }                  
                }
              this.SETMETERLISTDATAALL(this.rightDataZ);
              
            }
            let oilFlowTop = 0 , oilFlowBtn = 0         
            for (let i = 0; i < this.rightDataZ.length; i++) {        //初始化来油总量数据
              let _data = this.rightDataZ[i].data.length - 1
              if(this.rightDataZ[i].id === 'main_mc_jzx_ll01') {    //这条数据没有在数据库，在本地写死的，来油流量
                oilFlowTop = this.rightDataZ[i].data
              }
              if(this.rightDataZ[i].id === 'main_mc_jzd_ll01') {       //这条数据没有在数据库，在本地写死的，来油总流量是来油流量上+来油流量下的总和
                oilFlowBtn = this.rightDataZ[i].data
              }
            }
            this.SETOILFLOWZONG(parseFloat(oilFlowTop) + parseFloat(oilFlowBtn))
          }
        }).catch((err) => {
          console.log(err)
        })
    this.setTime1();
  },
  beforeRouteLeave (to, from, next) {
      if(to.name !== "view2d_inspect_data") {
        this.stop_inspection(0);
      }
      next();
    },
  methods: {
    openShow(){     //是否开启管控
      if(this.openOrCloseName === '关闭'){
        this.openOrCloseName = '开启';
        this.openOrClose = true;
        this.animateArr.forEach((item)=>{       
          this.popoverList.forEach(item1 => {
            if(item.unityId === item1.unityId && item.isRun == 1) {
              item1.stopArr.forEach(item2 =>{
                this.stopArr.push(item2);
              })
              this.meterListArr.push(item1.meterId)
            }
          })
        })
      }else{
        this.openOrCloseName = '关闭';
        this.openOrClose = false;
        this.stopArr = [];
        this.meterOkArr = [];
        this.meterListArr = [];
      }
      this.ReFreshA();
      this.ReFreshB();
      this.visible = false;
    },
    setTime1(){
     let settime = setTimeout(() => {
        clearTimeout(settime)
        this.accumulation = Math.random().toFixed(2);
        this.setTime1();
      }, 2000);
    },
    showright(data){      //右键显示
      this.popoverList.forEach((item)=>{
        if(item.unityId === data.unityId){
          this.visible1 = false;
          this.unitname = data.name;
          this.popoverTop = data.y;
          this.popoverLeft = data.x;
          this.popoverData = data;
          this.visible = true;
        }
      })
    },
    showright1(data){      //右键显示
      this.meterListA.forEach((item)=>{
        if(item.id === data.id){
          this.meterNum = "";
          this.visible = false;
          this.popoverTop = data.y;
          this.popoverLeft = data.x;
          this.meterData = data;
          this.visible1 = true;
        }
      })
    },
    hideright(){      //关闭显示
      this.visible = false;
    },
    hideright1(){      //关闭显示
      this.visible1 = false;
    },
    meterOk(data){    //设置仪表阀值
      if(this.meterOkArr.length > 0){
        for (let i = 0; i < this.meterOkArr.length; i++){
          if(this.meterOkArr[i].id === this.meterData.id) {
            this.meterOkArr[i].meterNum = this.meterNum;
          }else{
            this.meterOkArr.push({id:this.meterData.id,meterNum:this.meterNum});
          }
        }
      }else{
        this.meterOkArr.push({id:this.meterData.id,meterNum:this.meterNum});
      }
      this.visible1 = false;
    },
    handleSetData(data){      //设置设备是否开启
      let params = {
        id:data.id,
        isRun:data.isRun
      }
      this.$http.put(`/admin/device/setIsRun`,params).then((res)=>{
        if(res.code === 200){
          if(data.isRun == 1){
            this.popoverList.forEach((item)=>{
              if(data.unityId === item.unityId){
                item.stopArr.forEach((item1,index1)=>{
                  this.stopArr.push(item1);
                })
                this.ReFreshA();
                this.ReFreshB();
                this.meterListArr.push(item.meterId);
              }
            })
          }else{
            let num = "",num1 = "";
            this.popoverList.forEach((item)=>{
              if(item.unityId === data.unityId){
                item.stopArr.length > 0 && item.stopArr.forEach((item1)=>{
                  this.stopArr.forEach((item2)=>{
                    if(item1 === item2){
                      num = this.stopArr.indexOf(item2);
                      this.stopArr.splice(num,1);
                    }
                  })
                  this.meterListArr.forEach(item3 => {
                    if(item.meterId === item3) {
                      num1 = this.meterListArr.indexOf(item3);
                      this.meterListArr.splice(num1,1)
                    }
                  })
                })
              }
              this.ReFreshA();
              this.ReFreshB();
            })
          }
          this.$notify({
            title: '信息提示',
            message: res.message,
            position: 'bottom-right',
            type: 'success'
          });
        }
        if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
          this.$confirm(res.message, '提示', {
            type: 'warning',
            customClass: "errormessage",
            showCancelButton: false,
            center: "true"
          }).then(() => {
          }).catch(() => {
          });
        }
        if (res.code === 205) {
          this.$router.push("/login");
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    ...mapMutations(['SETMETERLISTDATAALL','SETMETERTHRESHOLDVALUE','SETMETERTHRESHOLDVALUEARR','SETOILFLOWZONG',"SETMETERLISTDATA"]),
    closeInspection(){    //巡检按钮关闭
      this.inspectionIsShow = !this.inspectionIsShow;
    },
    clickInspectImg (index,obj){
      if (this.procedureState == '正在巡检中...' || this.procedureState == '巡检暂停中...') {
        this.$message.warning('巡检完成后再做此操作，或者手动停止巡检！')
        return
      }
      this.isIndex = index;
      this.getDevByPotClick(obj.id,obj.unityId);
    },
    getDevByPotClick(deviceId,unityId) { //   二维点击   通过unityId通知后台改变推送信息来对三维进行联动
      this.$http.get(`/admin/meter/clickByDeviceId?deviceId=${deviceId}&unityId=${unityId}&userId=${this.userId}&t=${Math.random()}`)
        .then((res) => {
          if(res.code === 200) {
            // this.devList = res.data;
            // this.meterListData = res.data;
            // this.SETMETERLISTDATA(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    ReFreshA(){
        this.reFreshA= false
        this.$nextTick(()=>{
            this.reFreshA = true
        })
    },
    ReFreshB(){
        this.reFreshB= false
        this.$nextTick(()=>{
            this.reFreshB = true
        })
    },
    handleClickMenu(index,flag) {    //点击去相应的分支
      this.isClick = !flag;
      if(flag === 'true' && (this.procedureState == '正在巡检中...' || this.procedureState == '巡检暂停中...')) {
        this.$message.warning('巡检完成后再做此操作，或者手动停止巡检！')
        return
      } else {
        this.imgUrl = require(`../../assets/tuoer/${index}.png`);
        this.menuListIndex = index;
        if( this.menuListIndex === '1'){
          this.SETMETERLISTDATAALL(this.rightDataZ);
        } else if (this.menuListIndex === '2') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let j = 0; j < this.rightDataY.length; j++) {
              if(this.rightData[i].meterNum === this.rightDataY[j].id){
                this.rightDataY[j].data = this.rightData[i].value;
                this.rightDataY[j].unit = this.rightData[i].unit;
                this.rightDataY[j].warnType = this.rightData[i].warnType;
                this.rightDataY[j].isShow = this.rightData[i].isShow;
              }
            }
          }
          this.SETMETERLISTDATAALL(this.rightDataY);
        } else if (this.menuListIndex === '3') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let j = 0; j < this.rightData3.length; j++) {
              if(this.rightData[i].meterNum === this.rightData3[j].id) {
                this.rightData3[j].data = this.rightData[i].value;
                this.rightData3[j].unit = this.rightData[i].unit;
                this.rightData3[j].warnType = this.rightData[i].warnType;
                this.rightData3[j].isShow = this.rightData[i].isShow;
              } 
            }
          }
          this.SETMETERLISTDATAALL(this.rightData3);
        } else if (this.menuListIndex === '4') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let j = 0; j < this.rightData4.length; j++) {
              if (this.rightData[i].meterNum === this.rightData4[j].id) {
                this.rightData4[j].data = this.rightData[i].value;
                this.rightData4[j].unit = this.rightData[i].unit;
                this.rightData4[j].warnType = this.rightData[i].warnType;
                this.rightData4[j].isShow = this.rightData[i].isShow;
              } 
            }
          }
          this.SETMETERLISTDATAALL(this.rightData4);
        }if (this.menuListIndex === '5') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let j = 0; j < this.rightData5.length; j++) {
              if (this.rightData[i].meterNum === this.rightData5[j].id) {
                this.rightData5[j].data = this.rightData[i].value;
                this.rightData5[j].unit = this.rightData[i].unit;
                this.rightData5[j].warnType = this.rightData[i].warnType;
                this.rightData5[j].isShow = this.rightData[i].isShow;
              } 
            }
          }
          this.SETMETERLISTDATAALL(this.rightData5);
        }else if (this.menuListIndex === '6') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let j = 0; j < this.rightData6.length; j++) {
              if (this.rightData[i].meterNum === this.rightData6[j].id) {
                this.rightData6[j].data = this.rightData[i].value;
                this.rightData6[j].unit = this.rightData[i].unit;
                this.rightData6[j].warnType = this.rightData[i].warnType;
                this.rightData6[j].isShow = this.rightData[i].isShow;
              } 
            }
          }
          this.SETMETERLISTDATAALL(this.rightData6);
        }else if (this.menuListIndex === '7') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let j = 0; j < this.rightData7.length; j++) {
              if (this.rightData[i].meterNum === this.rightData7[j].id) {
                this.rightData7[j].data = this.rightData[i].value;
                this.rightData7[j].unit = this.rightData[i].unit;
                this.rightData7[j].warnType = this.rightData[i].warnType;
                this.rightData7[j].isShow = this.rightData[i].isShow;
              } 
            }
          }
          this.SETMETERLISTDATAALL(this.rightData7);
        }
          if (this.menuListIndex === '8') {
          for (let i = 0; i < this.rightData.length; i++) {
            for (let k = 0; k < this.rightData8.length; k++) {
              if (this.rightData[i].meterNum === this.rightData8[k].id) {
                this.rightData8[k].data = this.rightData[i].value;
                this.rightData8[k].unit = this.rightData[i].unit;
                this.rightData8[k].warnType = this.rightData[i].warnType;
                this.rightData8[k].isShow = this.rightData[i].isShow;
              }
            }
          }
          this.SETMETERLISTDATAALL(this.rightData8);
        }
      }
    },
    formatTime(date) {
      let Y = date.getFullYear()
      let M = Number(date.getMonth()) + 1 < 10 ? '0' + (Number(date.getMonth())+1) : Number(date.getMonth())+1
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // return ''+Y+M+D+h
      return `${Y}-${M}-${D} ${h}:${m}:${s}`
    },
    getServerDate() {  //获取系统时间
      return new Date($.ajax({ async: false, cache: false }).getResponseHeader("Date"));
    },
    onChangePot(){  //仪器点改变
     if(this.is_able){
        this.$message.warning('巡检完成后再做此操作，或者手动停止巡检！')
        return
      }
      if(this.procedureState == '正在巡检中...' || this.procedureState == '巡检暂停中...'){
        this.$message.warning('巡检完成后再做此操作，或者手动停止巡检！')
        return
      }
      if(this.timerWork){
        return
      }
    },
    inspection(mask) {
      let time;
      if(this.animateIndex === 0) this.getDevByPot(this.animateArr[0].id,this.animateArr[0].unityId);
      if(this.animateArr[this.animateIndex].inspectionTime){
        time = this.animateArr[this.animateIndex].inspectionTime
      }
      this.isIndex = this.animateIndex;
      this.timer = setTimeout(() => {
        this.next(time)
        clearTimeout(this.timer)
        this.timer = null
        if(this.animateIndex === this.animateArr.length - 1){
          clearTimeout(this.timer)
          this.timer = null
        }else{
          this.inspection()
        }
      },time)
    },
    next(mask,time) {
      if(this.animateIndex + 1 <= this.animateArr.length-1){
        this.status = '';
        let currentOption = this.animateArr[this.animateIndex];
        let nextOption = this.animateArr[this.animateIndex + 1];
        this.getDevByPot(nextOption.id,nextOption.unityId);  //获取设备画框
        this.animateIndex++;
        if(this.animateIndex === this.animateArr.length -  1){
          this.isIndex = this.animateIndex;
          this.endTime = this.formatTime(this.getServerDate());
          this.pause_inspection()
          this.state = true;
          this.SETMETERLISTDATA([]);
          this.procedureState = "巡检已完成"
          let timer = setTimeout(()=>{
            clearTimeout(timer)
            this.getDevByPot2();
            this.getInspectionReport();
            this.SETMETERLISTDATA([]);
            this.procedureState = "巡检已完成";
            this.isIndex = "";
          },time)
        }
      }
    },
    formatTime2(date) {
      let Y = date.getFullYear()
      let M = Number(date.getMonth()) + 1 < 10 ? '0' + (Number(date.getMonth())+1) : Number(date.getMonth())+1
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // return ''+Y+M+D+h
      return `${Y}-${M}-${D} ${h}:${m}:${s}`
    },
    getInspectionReport() {     
      this.$http.get(`/admin/inspectionLog/findInspectionResult?startTime=${this.startTime}&endTime=${this.endTime}&t=${Math.random()}`)
        .then((res) => {
          // console.log(res)
          if(res.code === 200) {
            this.dialogVisible = true;
            let tempData = res.data;
            this.inspectionResult = tempData.inspectionResult;  //巡检结果
            this.inspectionStatus = tempData.inspectionStatus;  //巡检状态
            this.deviceSum = tempData.deviceSum;  //巡检设备数量
            this.meterSum = tempData.meterSum;  //巡检仪表数量
            this.warnMeterSum = tempData.warnMeterSum; //仪表报警数
            this.warnDeviceSum = tempData.warnDeviceSum;  //设备报警数
            this.inspectionScope = tempData.inspectionScope;  //巡检范围
            this.inspectionResults = tempData.warnData || [];     //巡检结果数组      
          }
          if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.errmessage = res.message
            this.$confirm(res.message, '提示', {
              type: 'warning',
              customClass: "errormessage",
              showCancelButton: false,
              center: "true"
            }).then(() => {
            }).catch(() => {
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    submit_inspection_log() { //巡检弹框确认按钮
      this.stop_inspection();  
      this.dialogVisible = false;
      this.handleClickMenu('1','true')
      this.animateIndexZ = 0;
      this.$http.post(`/admin/inspectionLog/add`,{
        startTime: this.startTime,
        endTime: this.endTime,
        "user.id": localStorage.getItem('userId'),
        deviceSum: this.deviceSum,
        warnSum: this.warnSum,
        inspectionScope: this.inspectionScope,
        inspectionResult: this.inspectionResult,
        inspectionStatus: this.inspectionStatus,
        warnData: JSON.stringify(this.inspectionResults),
        meterSum: this.meterSum,
        warnDeviceSum: this.warnDeviceSum,
        warnMeterSum: this.warnMeterSum
      })
        .then((res) => {
          // console.log(res)
          if(res.code === 200) {
            // this.closeWebsocket();
            this.$notify({
              title: '信息提示',
              message: res.message,
              position: 'bottom-right',
              type: 'success'
            });
          }
          if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.errmessage = res.message
            this.$confirm(res.message, '提示', {
              type: 'warning',
              customClass: "errormessage",
              showCancelButton: false,
              center: "true"
            }).then(() => {
            }).catch(() => {
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    }, 
    handleClose() { //巡检报告关闭
      this.dialogVisible = false;
    },
    getDevByPot(deviceId,unityId) {  //获取当前仪器的数据  ==
      this.$http.get(`/admin/meter/findByDeviceId?deviceId=${deviceId}&unityId=${unityId}&userId=${this.userId}&t=${Math.random()}`)
        .then((res) => {
          if(res.code === 200) {
            // this.SETMETERLISTDATA(res.data);
            if(this.animateIndex  === this.animateArr.length -  1) {  //巡检最后一个unityid传空
              this.getDevByPot2();
            }
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    getDevByPot2() {  //获取当前仪器的数据  
      let deviceId = "", unityId = "";
      this.$http.get(`/admin/meter/findByDeviceId?deviceId=${deviceId}&unityId=${unityId}&userId=${this.userId}&t=${Math.random()}`)
        .then((res) => {
          
        }).catch((err) => {
          console.log(err)
        })
    },
    setTimeStart_inspection () {        //自定义巡检的时候调用
      if(!this.isInspect) return;
      this.dialogVisible = false;
      // this.handleClickMenu('2')
      this.startTime = this.formatTime(this.getServerDate());
      this.onChangePot()
      this.stop_inspection();
      this.state = false;
      this.is_state = false;
      this.able = false;
      this.firstEleIsClick = false;
      this.inspection(this.maskY);
      this.procedureState = '正在巡检中...'
    },
    start_inspection() { //开始巡检
      clearTimeout(this.setTimer)
      if(!this.isInspect) return;
      this.handleClickMenu('1','true');
      this.activeName = "1";
      this.dialogVisible = false;
      this.startTime = this.formatTime(this.getServerDate());
      this.onChangePot()
      this.stop_inspection();
      this.state = true;
      this.is_state = false;
      this.able = false;
      this.firstEleIsClick = false;
      this.inspection(this.maskY);
      this.procedureState = '正在巡检中...'
    },
    stop_inspection(num) {  //停止巡检
      if(num === 0){
        this.timeSet = 0;
        this.timeSetData = this.timeSet;
        clearTimeout(this.setTimer)
      }
      this.pause_inspection();
      //回到第一个巡检的位置
      // this.clear_high_light_rect()
      this.isIndex = "";
      let obj = this.animateArr[0];
      this.firstEleIsClick = true;
      this.animateIndex =0;
      this.animateIndexZ = 0;
      this.state = true;
      this.is_state = true;
      this.able = true;

      // this.getDevByPot(obj.id)
      this.procedureState = '已停止巡检'
    },
    pause_inspection() {  //暂停巡检
      this.procedureState = '巡检暂停中...'
      this.state = false;
      this.is_state = true;
      this.able = false;
      clearTimeout(this.timer)
      this.timer = null
    },
    continue_inspection() { //继续巡检
      this.procedureState = '正在巡检中...'
      this.state = true;
      this.is_state = false;
      this.able = false;
      // this.next()
      if( this.menuListIndex === '2') {
        this.inspection(this.maskY)
      } else if( this.menuListIndex === '3') {
        this.inspection(this.maskX)
      } else if( this.menuListIndex === '4') {
        this.inspection(this.maskW)
      } 
    },
    showInput(time) {
      clearTimeout(this.setTimer)
      if(time === 'timeSet'){
        this.isInputShow = !this.isInputShow
      } else {
        this.timeSet = 0
        this.timeSetData = this.timeSet
      }
    },
    handleOk() {      //自定义巡检时间
      let  flag = new RegExp("^[1-9]([0-9])*$").test(this.timeSet);
      if (!flag) {
      this.$message({
        showClose: true,
        message: "请输入正整数",
        type: "warning"
        });
      } else {
        this.timeSetData = this.timeSet;
        this.isInputShow = !this.isInputShow;
        clearTimeout(this.setTimer);
        this.setTime();
      }
      
    },
    setTime(){
      let time = this.timeSetData*1000*60;
      if (this.procedureState == '正在巡检中...' || this.procedureState == '巡检暂停中...') return;
      this.setTimer = setTimeout (()=>{
        clearTimeout(this.setTimer)
        this.setTimeStart_inspection();
      },time)
    },
    handleParamsSet() { //获取参数设置表格数据
      this.paramsSetDialog = true;
      this.$http.get(`/admin/device/findAll?t=${Math.random()}`)
        .then((res) => {
          console.log(res)
          if(res.code === 200) {
            this.deviceData = res.data;
          }
          if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.errmessage = res.message
            this.$confirm(res.message, '提示', {
              type: 'warning',
              customClass: "errormessage",
              showCancelButton: false,
              center: "true"
            }).then(() => {
            }).catch(() => {
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    lookInspectLog() { //查看巡检日志
      localStorage.setItem("itemSelect",'3');  //系统日志的下标为3
      this.$router.push("/patrolLog");
    },
    getInspectionTime (mask) {
      for (let i = 0; i < this.animateArr.length; i++) {
        for (let j = 0; j < mask.length; j++) {
          if(mask[j].id === this.animateArr[i].id) {
            mask[j].inspectionTime = this.animateArr[i].inspectionTime
            mask[j].unityId = this.animateArr[i].unityId
          }
        }
      }
    },
    getRowClass({	row,column,rowIndex,columnIndex}) {
      if (rowIndex == 0) {
        return 'text-align: center;background:#01435D;color:#ccc;'
      } else {
        return ''
      }
    },
    handleUpAndDown(index,row,num) {  //改变巡检顺序
      if(index == 0 && num == -1) {
        this.$confirm("已经最小了！", '信息提示', {
          type: 'error',
          customClass: "errormessage",
          showCancelButton: false,
          center: "true"
        }).then(() => {
        }).catch(() => {
        });
        return;
      }
      if(index == this.deviceData.length - 1 && num == 1) {
        this.$confirm("已经最大了！", '信息提示', {
          type: 'error',
          customClass: "errormessage",
          showCancelButton: false,
          center: "true"
        }).then(() => {
        }).catch(() => {
        });
        return;
      }
      let id2 = this.deviceData[index + num];
      this.$http.put(`/admin/device/updateSort`, {
         id1: row.id,
         sort1: row.sort,
         id2: id2.id,
         sort2: id2.sort
       })
        .then((res) => {
          console.log(res)
          if(res.code === 200) {
            this.$notify({
              title: '信息提示',
              message: res.message,
              type: 'success'
            });
            this.handleParamsSet();
          }
          if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.errmessage = res.message
            this.$confirm(res.message, '信息提示', {
              type: 'error',
              customClass: "errormessage",
              showCancelButton: false,
              center: "true"
            }).then(() => {
            }).catch(() => {
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handleToggleRecycleStatus(data) { //改变巡检状态
      console.log(data)
       this.$http.put(`/admin/device/setIsInspection`, {
         id: data.id,
         value:data.isSpection
       })
        .then((res) => {
          console.log(res)
          if(res.code === 200) {
            this.$notify({
              title: '信息提示',
              message: res.message,
              type: 'success'
            });
          }
          if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.errmessage = res.message
            this.$confirm(res.message, '信息提示', {
              type: 'error',
              customClass: "errormessage",
              showCancelButton: false,
              center: "true"
            }).then(() => {
            }).catch(() => {
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handleSetRuning (data) {    //设置设备是否运行
      let params = {
        id:data.id,
        isRun:data.isRun
      }
      this.$http.put(`/admin/device/setIsRun`,params).then((res)=>{
        if(res.code === 200){
          this.$notify({
            title: '信息提示',
            message: res.message,
            position: 'bottom-right',
            type: 'success'
          });
        }
        if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
          this.$confirm(res.message, '提示', {
            type: 'warning',
            customClass: "errormessage",
            showCancelButton: false,
            center: "true"
          }).then(() => {
          }).catch(() => {
          });
        }
        if (res.code === 205) {
          this.$router.push("/login");
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    handleTimeSet(index,row) { //巡检时间设置
      console.log(row)
      var reg=/^[0-9]+.?[0-9]*$/;
      if(row.inspectionTime < .01) {
        this.$confirm("巡检时间不能小于0.01分钟!", '信息提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
        }).catch(() => {
        });
        return;
      }
      if(!reg.test(row.inspectionTime)) {
        this.$confirm("格式不正确", '信息提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
        }).catch(() => {
        });
        return;
      }
      this.$http.put(`/admin/device/setInspectionTime`, {
         id: row.id,
         inspectionTime: row.inspectionTime
       })
        .then((res) => {
          console.log(res)
          if(res.code === 200) {
            this.$confirm(res.message, '信息提示', {
              confirmButtonText: '确定',
              type: 'success',
              center: true
            }).then(() => {
            }).catch(() => {
            });
          }
          if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.$confirm(res.message, '信息提示', {
              confirmButtonText: '确定',
              type: 'error',
              center: true
            }).then(() => {
            }).catch(() => {
            });
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    thresholdSet() { //设置阈值
       this.$http.get(`/admin/meter/findWarnMeterAll?t=${Math.random()}`)
       .then((res)=>{
         if(res.code === 200) {
           let data = res.data
           this.attrArr = [];
           this.meterNumber = [];
           if(data && data.length > 0){
             let dataObj = {}
             for (let i = 0; i < data.length; i++ ) {
              let minArr = data[i].minWarnValuesStr? data[i].minWarnValuesStr.split("&") : [];
              let maxArr = data[i].maxWarnValuesStr? data[i].maxWarnValuesStr.split("&") : [];
              let minWarningValue = minArr.length > 0?  minArr[0] : "";
              let minminWarningValue =  minArr.length > 0?  minArr[1] : "";
              let maxWarningValue =  maxArr.length > 0?  maxArr[0] : "";
              let maxmaxWarningValue = maxArr.length > 0?  maxArr[1] : "";
              dataObj = {
                leftRangesStr:data[i].leftRangesStr, //左侧合理值
                rightRangesStr: data[i].rightRangesStr,  //右侧合理值
                minWarningValue: minWarningValue,  //低
                minminWarningValue: minminWarningValue,  //低低
                maxWarningValue: maxWarningValue,  //高
                maxmaxWarningValue: maxmaxWarningValue,  //高高
                trendValuesStr: data[i].trendValuesStr,  //趋势报警值
                // descValuesStr: data[i].descValuesStr,  //仪表描述
                meterName: data[i].meterName,  //仪表名称
                meterThresholdValue: this.setMeterThresholdValue,
                id:data[i].id,
                meterNumber:data[i].meterNumber
              }
              this.meterNumber.push({meterNumber:data[i].meterNumber,value:''})    //实时数据的id
              //  console.log(dataObj,'oooo')
              this.attrArr.push(dataObj)
             }
              this.SETMETERTHRESHOLDVALUEARR(this.meterNumber)
           }
            this.thresholdParameter = true;
         }
         if(res.code === 205) {
            this.$router.push("/login");
          }
          if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
            this.errmessage = res.message
            this.$confirm(res.message, '信息提示', {
              type: 'error',
              customClass: "errormessage",
              showCancelButton: false,
              center: "true"
            }).then(() => {
            }).catch(() => {
            });
            
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    isOk (data) {     //修改阈值
      let minWarnValuesStr = data.minWarningValue + "&" + data.minminWarningValue;
      let maxWarnValuesStr = data.maxWarningValue + "&" + data.maxmaxWarningValue;
      let parms = {
        meterName: data.meterName,  //仪表名称
        leftRangesStr:data.leftRangesStr, //左侧合理值
        rightRangesStr: data.rightRangesStr,  //右侧合理值
        minWarnValuesStr: minWarnValuesStr,  //低
        maxWarnValuesStr: maxWarnValuesStr,  //高高
        trendValuesStr:data.trendValuesStr,  //趋势报警值
        // descValuesStr: data.descValuesStr,  //仪表描述
      }
      // console.log(parms)
      this.$http.put(`/admin/meter/update/${data.id}`,parms)
      .then((res)=>{
        console.log(res,'res')
        if (res.code == 200) {
          // this.thresholdParameter = false;
          this.$notify({
            title: '信息提示',
            message: res.message,
            position: 'bottom-right',
            type: 'success'
          });
          this.alarmStatus(data.meterNumber)
        }
        if (res.code === 204 || res.code === 201 || res.code === 202 || res.code === 203) {
          this.$confirm(res.message, '提示', {
            type: 'warning',
            customClass: "errormessage",
            showCancelButton: false,
            center: "true"
          }).then(() => {
          }).catch(() => {
          });
        }
        if (res.code === 205) {
          this.$router.push("/login");
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    alarmStatus(meterNumber){        //修改报警状态后调用
      let data = {
        interceptRequestType:1,      //请求拦截的时候如果有这一个字段，就访问另一个服务器
        devCodes: meterNumber
      }
      this.$http.post(`/webController/updateMeter`,data).then((res)=>{
          if(res.code === 200){
            console.log(res)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    ...mapState(['meterListData','meterListDataAll','oilFlowZong','setMeterThresholdValue','setMeterThresholdValueArr','meterListDataPot','meterListDataPotW']),
    progress() {
      if(this.animateArr[0]){
        if(this.animateIndex == 0){
          return 0
        }else{
          return parseInt(100*((this.animateIndex + 1)/this.animateArr.length))
        }
      }
    },
    is_able() {
      if(this.animateArr[0]) {
        let obj = this.animateArr[0]
        if(this.procedureState == '正在巡检中...'){
          if(this.animateIndex === 0){
            return true
          }
        }
        return this.animateIndex === 0 ? false : true
      }
    },
    is_result_show() {
      return this.inspectionResults.length > 0 ? true : false
      // return true
    },
    isInspect () {
      return this.animateArr.length > 0
    },
    meterListData () {
      if(this.meterListDataAll.filter((item)=>item.isShow === 0)){
        for (let i = 0; i < this.meterListDataAll.length; i++) {
          for (let j = 0; j < this.meterListArr.length; j++) {
            if(this.meterListDataAll[i].id === this.meterListArr[j]){
              this.meterListDataAll[i].data = 0;
            }
          }
        }
      }
      return this.meterListDataAll;
      // return this.meterListDataAll.filter((item)=>item.isShow === 0)       //在设备管理点击数据是否展示，isshow=0的时候，这条数据展示
    }
  },
  watch:{
    "meterListData":{
      handler(newVal,oldVal){
        // console.log(Math.random().toFixed(2))
        if(this.meterListDataAll.filter((item)=>item.isShow === 0)){
          for (let i = 0; i < this.meterListDataAll.length; i++) {
            for (let j = 0; j < this.meterListArr.length; j++) {
              if(this.meterListDataAll[i].id === this.meterListArr[j]){
                this.meterListDataAll[i].data = 0;
              }
            }
            for (let k = 0; k < this.meterOkArr.length; k++) {
              if(this.meterListDataAll[i].id === this.meterOkArr[k].id){
                this.meterListDataAll[i].data = Number(this.meterOkArr[k].meterNum) - Number(this.accumulation);
              }
            }
          }
          
          
        }
        return this.meterListDataAll;
      },
      deep: true
    },
    'setMeterThresholdValueArr': {
      handler(newVal,oldVal){
        // console.log(newVal.length)
        if(this.thresholdParameter){
          for (let i = 0; i < newVal.length; i++) {
            this.$set(this.attrArr[i], "meterThresholdValue", newVal[i].value);
          }
        }
      },
      deep: true
    },
    'clientW':{
      handler(newVal,oldVal){
        this.ReFreshA()
        this.ReFreshB()
      },
      deep: true
    },
    'clientH':{
      handler(newVal,oldVal){
        this.ReFreshB()
        this.ReFreshA()
      },
      deep: true
    },
    'meterListDataPot':{
      handler(newVal,oldVal){
        if(this.menuListIndex==='1'){
          newVal.forEach((item,index)=>{
            this.maskPotListJ.forEach((i,e) => {
              if(item.id === i.id && item.id === 'main_flq01_syw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq02_syw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq03_syw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq04_syw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq05_syw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq06_syw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_yjcjg01_sw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_yjcjg04_sw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg02_sw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg06_sw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg03_sw01') {
                let num = ((item.data)/11.5*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg05_sw01') {
                let num = ((item.data)/11.5*7.8).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }else if(this.menuListIndex==='2'){
          newVal.forEach((item,index)=>{
            this.maskPotListJ2.forEach((i,e) => {
              if(item.id === i.id && item.id === 'main_flq01_syw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq02_syw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq03_syw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq04_syw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq05_syw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq06_syw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }else if(this.menuListIndex==='4'){
          newVal.forEach((item,index)=>{
            this.maskPotListJ4.forEach((i,e)=>{
              if(item.id === i.id && item.id === 'main_yjcjg01_sw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_yjcjg04_sw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg02_sw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg06_sw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg03_sw01') {
                let num = ((item.data)/11.5*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg05_sw01') {
                let num = ((item.data)/11.5*14.5).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }
        
      },
      deep: true
    },
    'meterListDataPotW':{
      handler(newVal,oldVal){
        if(this.menuListIndex==='1'){
          newVal.forEach((item,index)=>{
            this.maskPotListW.forEach((i,e)=>{
              if(item.id === i.id && item.id === 'main_xfg01_yw01'){
                let num = ((item.data)/10.12*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_xfg02_yw01') {
                let num = ((item.data)/10.12*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_xfg03_yw01') {
                let num = ((item.data)/8.938*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cyg01_yw01') {
                let num = ((item.data)/13.098*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cyg02_yw01') {
                let num = ((item.data)/13.098*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cjg03_yw01') {
                let num = ((item.data)/11.313*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cjg04_yw01') {
                let num = ((item.data)/11.313*7.8).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_hcg05_yw01') {
                let num = ((item.data)/8.938*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_hcg06_yw01') {
                let num = ((item.data)/8.938*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_sgg01_yw01') {
                let num = ((item.data)/11.725*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_sgg02_yw01') {
                let num = ((item.data)/11.725*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_yjcjg01_yw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_yjcjg04_yw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg02_yw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg06_yw01') {
                let num = ((item.data)/14.8*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg03_yw01') {
                let num = ((item.data)/11.5*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg05_yw01') {
                let num = ((item.data)/11.5*7.8).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq01_yyw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq02_yyw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq03_yyw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq04_yyw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq05_yyw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq06_yyw01') {
                let num = ((item.data)/4*2.2).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }else if(this.menuListIndex==='2'){
          newVal.forEach((item,index)=>{
            this.maskPotListW2.forEach((i,e)=>{
              if(item.id === i.id && item.id === 'main_flq01_yyw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq02_yyw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq03_yyw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq04_yyw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq05_yyw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_flq06_yyw01') {
                let num = ((item.data)/4*6).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }else if(this.menuListIndex==='3'){
          newVal.forEach((item,index)=>{
            this.maskPotListW3.forEach((i,e)=>{
              if(item.id === i.id && item.id === 'main_xfg01_yw01'){
                let num = ((item.data)/10.12*19.5).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_xfg02_yw01') {
                let num = ((item.data)/10.12*17.5).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_xfg03_yw01') {
                let num = ((item.data)/8.938*15).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        } else if(this.menuListIndex==='4'){
          newVal.forEach((item,index)=>{
            this.maskPotListW4.forEach((i,e)=>{
              if(item.id === i.id && item.id === 'main_yjcjg01_yw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_yjcjg04_yw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg02_yw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_ejcjg014.6_yw01') {
                let num = ((item.data)/14.8*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg03_yw01') {
                let num = ((item.data)/11.5*14.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_jhyg05_yw01') {
                let num = ((item.data)/11.5*14.5).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }else if(this.menuListIndex==='5'){
          newVal.forEach((item,index)=>{
            this.maskPotListW5.forEach((i,e)=>{
              if (item.id === i.id && item.id === 'main_cyg01_yw01') {
                let num = ((item.data)/13.098*9.3).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cyg02_yw01') {
                let num = ((item.data)/13.098*9.3).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cjg03_yw01') {
                let num = ((item.data)/11.313*9.3).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_cjg04_yw01') {
                let num = ((item.data)/11.313*9.3).toFixed(1)
                i.h = num+'%';
              }else if (item.id === i.id && item.id === 'main_hcg05_yw01') {
                let num = ((item.data)/8.938*9.3).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_hcg06_yw01') {
                let num = ((item.data)/8.938*9.3).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_sgg01_yw01') {
                let num = ((item.data)/11.725*11.5).toFixed(1)
                i.h = num+'%';
              }else if(item.id === i.id && item.id === 'main_sgg02_yw01') {
                let num = ((item.data)/11.725*11.5).toFixed(1)
                i.h = num+'%';
              }
            })
          })
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
  .right .inspectImgActive {
    opacity: 1;
    transition: all 3s;
    /* filter: drop-shadow(4px 4px 6px yellow); */
  }
  div {
    box-sizing: border-box;
  }
  .active {
    background: #194AB9;
  }
  .dataShow {
    width: 100%;
    height:calc(100% - 58px);
    /* background:red; */
  }
  .dataShow .top {
    height: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    background: rgb(1,0,39);
    padding-left: 60px;
  }
  .dataShow .topItem {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #194AB9;
    margin: 0 3px;
    color: rgb(21,144,246);
    cursor: pointer;
  }
  .dataShow .topItemActive {
    color: #fff;
  }
  .dataShow .right {
    float: left;
    width: 100%;
    height: 95%;
    background: purple;
    position: relative;
  }
  .left_data {
    height: 65%;
  }
  .left_item {
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    text-align:center;
    border-bottom: 1px solid #888;
    background: #ccc;
    cursor: pointer;
  }
  /* .bottom_border {
    background: #aaa;
    border-bottom: 2px solid rgb(18, 18, 41);
  } */
  .left::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
  .left::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,1);
    border-radius: 10px;
    background: #ccc;
  }
  .right .right_image {
    width: 100%;
    height: 100%;
  }
  .imgMask {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .inspect {
    width: 100%;
    height: 30%;
    background:#fff;
    border: 1px solid #3484BF;
  }
  .inspect {
    display:flex;
  }
  .inspect .inspect_left_box, .inspect .inspect_right_box{
    flex:1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:#17242D;
  }
  .inspect .inspect_left_box {
    border-right: 6px solid #000;
  }
  .text-primary {
    color: #3484BF;
    margin-bottom: 14px;
  }
  .text-primary {
    position: absolute;
    right:5px;
    /* border: 1px solid #09111C; */
    cursor: pointer;
    width: 6%;
  }
  .inspect_right_box p {
    margin-bottom: 0;
  }
  .inspect_right_box div {
    margin-top: 8px;
  }
  .inspect_right_box el-button-group {
    margin: 0;
  }
  .span {
    border:1px solid rgb(183, 99, 7);
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background: rgb(18, 18, 41);
  }
  .police {
    color: red !important;
  }
  .mask {
    border: 2px solid yellow;
    background: #fff;
    opacity: .5;
    z-index: 999;
    transition: all 3s;
  }
  .sss {
    width: 20px;
    height: 30px;
    position: absolute;
    transform: translate(10%,20%);
    background: yellow;
  }
  /* 开关按钮显示 */
.setDialog /deep/ .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
.setDialog /deep/ .el-switch__label--right {
  z-index: 1;
  right: 30px;
  top: 0;
}
/*关闭时文字位置设置*/
.setDialog /deep/ .el-switch__label--left {
  z-index: 1;
  left: 24px;
  top: 0;
}
/*显示文字*/
.setDialog /deep/ .el-switch__label.is-active {
  display: block;
}
.setDialog /deep/ .el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 80px !important;
}

.visibleBox {
  width: 100%;
  height: auto;
  /* background:red; */
  border: 1px solid #666;
}
.visibleItem {
  display: flex;
}
.visibleItemLeft,.visibleItemRight {
  width: 50%;
  display:flex;
  border-bottom:1px solid #666;
}
.visibleItemLeftSpecial {
  width: 100%;
}
.visibleValue,.visibleTitle{
  padding: 6px 14px;
}
.visibleTitle {
  width: 150px;
  padding: 6px 14px;
}
.visibleValue {
  flex: 1;
  overflow: hidden;
}
.leftBorder {
  border-left: 1px solid #666;
}
.rightBorder {
  border-right: 1px solid #666;
}
.textSpace {
  letter-spacing: 6px;
  font-weight: 600;
}
.textLineHeight {
  line-height: 26px;
}
.texthanlde {
  overflow:hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
.textCenter {
  display: flex;
  justify-content: center;
}
.minwarn, .error {
  color: #e4393c;
}
.span_zong {
  position: absolute;
  left: 40%;
  top: 5%;
  width: 10%;
  height: 3%;
  transform: scale(.8);
}
.ok {
  color: red;
  margin-left: 22%;
  cursor: pointer;
}
.animat_time {
  padding: 0 14%;
}
  .maskPotContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .maskPotW {
    position: absolute;
    background-image: linear-gradient(#696969,#696969);
    opacity: 0.7;
    /* z-index: 5; */
  }
  .maskPot {
    position: absolute;
    background-image: linear-gradient(  #26d4ff,#006cff);
    opacity: 0.7;
  }
  .dataColor{
    color: greenyellow;
  }
  .seen {
    height: 10%;
    transform: scale(1.5);
    z-index: 100;
    transition: all 1s;
  }
  .seen1 {
    height: 3%;
    transform: scale(1.5);
    z-index: 100;
    transition: all 1s;
  }
  .right .fanImgList {
    position: absolute;
    /* z-index: 50; */
  }
  .fanImgList{
    -webkit-animation:rotateImg 2s linear infinite;
    -webkit-animation:rotateImg 2s linear infinite;
    -moz-animation:rotateImg 2s linear infinite;
    -o-animation:rotateImg 2s linear infinite;
    -ms-animation:rotateImg 2s linear infinite;
    vertical-align: middle;
  }
  @keyframes rotateImg {
    0% {transform : rotate(0deg);}
    100% {transform : rotate(360deg);}
  }
  @-webkit-keyframes rotateImg {
      0%{-webkit-transform : rotate(0deg);}
    100%{-webkit-transform : rotate(360deg);}
  }
  .inspectImgList {
    position: absolute;
    opacity: 0;
    z-index: 99 !important;
  }
  .rotatedeg {
    transform: rotate(90deg);
  }
  .rotatedeg1 {
    transform: rotate(270deg);
  }
  .Inspection {
    position: absolute;
    top: 97px;
    left: 0;
    width: 14%;
    height: 10%;
    z-index: 100;
    background: #696969;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .Inspection /deep/ .el-progress__text{
    color: #fff;
  }
  .inspect .inspect_left_box, .inspect .inspect_right_box{
    flex:1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:#17242D;
  }
  .inspect .inspect_left_box {
    border-right: 6px solid #000;
  }
  .inspect_left_content {
    display: flex;
    justify-content: center;
    height: 10px;
  }
  .inspect_left_nav {
    display: flex;
    justify-content: center;
  }
  .text-primary {
    color: #3196dd;
    margin-bottom: 14px;
  }
  .Inspection_btn{
    position: absolute;
    left: 5px;
    top:55px;
    padding: 5px 10px;
    width: 50px;
    cursor: pointer;
    z-index: 100;
  }
  .Inspection .inspect_left_box{
    color: #fff;
    height: 100%;
    width: 100%;
  }
  .top /deep/ .el-tabs__header {
    margin: 0;
    border: 0;
  }
  .top /deep/ .el-tabs__item {
    color: #ccc;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
  .top /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
    border: 1px solid #6a7284;
  }
  .top /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
   border: 0px;
  }
  .top /deep/ .is-active {
    color: #409EFF;
    border-bottom: none !important;
  }
  .popoverright{
    width:15px;
    height:15px;
    background:red;
    position:absolute;
    border-radius: 50%;
  }
   .popover {
    position: absolute;
    width: 300px;
    background: rgb(2, 32, 58);
    z-index: 111;
    border: 1px solid #ccc;
    border-radius: 10px;
    color: #fff;
    padding: 5px 10px;
  }
  .popover1 {
    width: 280px;
  }
  .popover1 /deep/ .el-input {
    width: 60%;
  }
  .popover .popover_title {
    font-weight: 700;
  }
  .popover_border{
    height: 1px;
    width: 255px;
    background: #696969;
    margin-top: 6px;
  }
  .popover .popover_content {
    font-size: 14px;
  }
  .popover .popover_btn {
    font-size: 14px;
  }
     /* 开关按钮显示 */
  .popover /deep/ .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  /*打开时文字位置设置*/
  .popover /deep/ .el-switch__label--right {
    z-index: 1;
    right: 20px;
    top: 0;
  }
  /*关闭时文字位置设置*/
  .popover /deep/ .el-switch__label--left {
    z-index: 1;
    left: 20px;
    top: 0;
  }
  /*显示文字*/
  .popover /deep/ .el-switch__label.is-active {
    display: block;
  }
  .popover /deep/ .el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 60px !important;
  }
</style>
