<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="资产名称：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="资产名称"></el-input>
          </el-form-item>
          <el-form-item label="使用部门：">
            <el-input style="width: 203px" v-model="listQuery.assetdept" placeholder="使用部门"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加资产</el-button>
      <el-button size="mini" class="btn-add" @click="downloadexcel()" style="margin-left: 60px">下载批量导入模板文件</el-button>
      <div>
      <el-upload
        style = "position: relative;left: 0px; top: 10px;"
        class="upload-demo"
        :action="api"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="uploadsuccess"
        :data = {orgid}
        :file-list="fileList">
        <el-button size="small" type="primary">批量上传</el-button>
      </el-upload>
      </div>
    </el-card>

    <div class="table-container">
      <el-table ref="unit"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="资产单位代码" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orgid}}</template>
        </el-table-column>
        <el-table-column label="资产编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetcode}}</template>
        </el-table-column>
        <el-table-column label="资产名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetname}}</template>
        </el-table-column>
        <el-table-column label="GS1编码" width="200" align="center">
          <template slot-scope="scope">{{scope.row.code4gs1}}</template>
        </el-table-column>
        <el-table-column label="资产原值" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetprice}}</template>
        </el-table-column>
        <el-table-column label="取得日期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.takedate}}</template>
        </el-table-column>
        <el-table-column label="数量" width="200" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="计量单位" width="200" align="center">
          <template slot-scope="scope">{{scope.row.measure}}</template>
        </el-table-column>
        <el-table-column label="累计折旧" width="200" align="center">
          <template slot-scope="scope">{{scope.row.accdepre}}</template>
        </el-table-column>
        <el-table-column label="存放地点" width="200" align="center">
          <template slot-scope="scope">{{scope.row.storeloc}}</template>
        </el-table-column>
        <el-table-column label="品牌" width="200" align="center">
          <template slot-scope="scope">{{scope.row.brand}}</template>
        </el-table-column>
        <el-table-column label="规格型号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.specific}}</template>
        </el-table-column>
        <el-table-column label="会计凭证号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.accdocno}}</template>
        </el-table-column>
        <el-table-column label="备注" width="200" align="center">
          <template slot-scope="scope">{{scope.row.notes}}</template>
        </el-table-column>
        <el-table-column label="使用人" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetuser}}</template>
        </el-table-column>
        <el-table-column label="使用部门" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetdept}}</template>
        </el-table-column>
        <el-table-column label="资产分类" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetclass}}</template>
        </el-table-column>
        <el-table-column label="资产国标大类" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetgbclass}}</template>
        </el-table-column>
        <el-table-column label="使用方向" width="200" align="center">
          <template slot-scope="scope">{{scope.row.usetype}}</template>
        </el-table-column>
        <el-table-column label="资产分类编码" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetclasscode}}</template>
        </el-table-column>
        <el-table-column label="取得方式" width="200" align="center">
          <template slot-scope="scope">{{scope.row.takemode}}</template>
        </el-table-column>
        <el-table-column label="坐落位置" width="200" align="center">
          <template slot-scope="scope">{{scope.row.workloc}}</template>
        </el-table-column>
        <el-table-column label="已提折旧月数" width="200" align="center">
          <template slot-scope="scope">{{scope.row.accdepremonth}}</template>
        </el-table-column>
        <el-table-column label="投入使用日期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.firstusedate}}</template>
        </el-table-column>
        <el-table-column label="记账日期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.billingdate}}</template>
        </el-table-column>
        <el-table-column label="资金来源" width="200" align="center">
          <template slot-scope="scope">{{scope.row.fundingsrc}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleQRCode(scope.$index, scope.row)">
              标签二维码
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,30,100,1000,10000,100000]"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="资产单位信息"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="newList"
               ref="newListForm"
               label-width="150px" size="small">
        <el-form-item label="资产单位代码:">
          <el-input v-model="newList.orgid" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资产编号：">
          <el-input v-model="newList.assetcode" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资产名称：">
          <el-input v-model="newList.assetname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="GS1编码:">
          <el-input v-model="newList.code4gs1" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资产原值：">
          <el-input v-model="newList.assetprice" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="取得日期：">
          <el-input v-model="newList.takedate" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="newList.amount" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="计量单位：">
          <el-input v-model="newList.measure" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="累计折旧：">
          <el-input v-model="newList.accdepre" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="存放地点：">
          <el-input v-model="newList.storeloc" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-input v-model="newList.brand" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="规格型号：">
          <el-input v-model="newList.specific" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="会计凭证号：">
          <el-input v-model="newList.accdocno" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="newList.notes" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="使用人：">
          <el-input v-model="newList.assetuser" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="使用部门：">
          <el-input v-model="newList.assetdept" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资产分类：">
          <el-input v-model="newList.assetclass" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资产国标大类：">
          <el-input v-model="newList.assetgbclass" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="使用方向：">
          <el-input v-model="newList.usetype" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="使用状况：">
          <el-input v-model="newList.usestate" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资产分类编码：">
          <el-input v-model="newList.assetclasscode" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="取得方式：">
          <el-input v-model="newList.takemode" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="坐落位置：">
          <el-input v-model="newList.workloc" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="已提折旧月数：">
          <el-input v-model="newList.accdepremonth" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="投入使用日期：">
          <el-input v-model="newList.firstusedate" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="记账日期：">
          <el-input v-model="newList.billingdate" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资金来源：">
          <el-input v-model="newList.fundingsrc" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="资产二维码信息"
      :visible.sync="QRCodeVisible"
      width="30%">
      <div id="printqrcode">
        <div style="width: 100px; height: 100px; margin: 0 auto;">
          <div style="text-align: center;" id="qrCode" ref="qrCode" class="qrcode"></div>
        </div>
        <div style="text-align: center;">{{newList.assetname}}</div>
        <div style="text-align: center;">资产编号：{{newList.assetcode}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center;">
          <el-button type="primary" @click="printQRCode()" size="small">打 印</el-button>
          <el-button @click="QRCodeVisible = false " size="small" >取 消</el-button>
        </div>
      </span>
    </el-dialog>

    <el-dialog
      title="批量资产二维码信息"
      :visible.sync="MultiQRCodeVisible"
      width="50%">
      <div id="multiprint">
        <div v-for="asset in multipleSelection2" :key="asset.assetid" style="width:400px; height: 200px; margin: 0 10;">
          <div :id="'printqrcode'+asset.assetid">
            <div style="width: 100px; height: 100px; margin: 0 auto;">
              <div style="text-align: center;" :id="'qrCode'+asset.assetid" ref="qrCode" class="qrcode"></div>
            </div>
            <div style="text-align: center;">{{asset.assetname}}</div>
            <div style="text-align: center;">资产编号：{{asset.assetcode}}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center;">
          <el-button type="primary" @click="MultiPrint()" size="small">打 印</el-button>
          <el-button @click="MultiQRCodeVisible = false " size="small" >取 消</el-button>
        </div>
      </span>
    </el-dialog>

    <el-dialog
      title="盘点任务发布"
      :visible.sync="taskVisible"
      width="60%">
      <el-form :model="taskAssign"
               ref="taskAssignForm"
               label-width="150px" size="small">
        <el-form-item label="任务摘要：">
          <el-input v-model="taskAssign.taskabstract" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="盘点开始时间：">
          <el-date-picker
            v-model="taskAssign.taskbegin"
            type="date"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="盘点结束时间：">
          <el-date-picker
            v-model="taskAssign.taskend"
            type="date"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleTaskDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
  import {fetchAsset,createAsset,updateAsset,deleteAsset} from '@/api/asset';
  import {fetchUser} from '@/api/root_user';
  import {createAssetCheckTask} from '@/api/task'
  import QRCode from 'qrcodejs2'
  import store from '@/store'
  import print from 'print-js'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: null,
    assetdept: null
  };
  const task = {
    assetid: [],
    orgid: null,
    taskabstract: null,
    taskbegin: null,
    taskend: null,
    username4unit: null,
    username4unit2: null, //盘点者
  };
  const assetRec = {
    assetid: null,
    orgid: null,
    assetcode: null,
    assetname: null,
    code4gs1: null,
    assetprice: null,
    takedate: null,
    amount: null,
    measure: null,
    accdepre: null,
    storeloc: null,
    brand: null,
    specific: null,
    accdocno: null,
    notes: null,
    assetuser: null,
    assetdept: null,
    assetclass: null,
    assetgbclass: null,
    usetype: null,
    usestate: null,
    assetclasscode: null,
    takemode: null,
    workloc: null,
    accdepremonth: null,
    firstusedate: null,
    billingdate: null,
    fundingsrc: null
  }
  export default {
    data(){
      return {
        operates: [
          {
            label: "批量打印",
            value: "print"
          },
          {
            label: "发布盘点任务",
            value: "taskAssign"
          }
        ],
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        userlist: null,
        listloading: false,
        dialogVisible: false,
        total: null,
        newList:Object.assign({}, assetRec),
        isEdit: false,
        api: null,
        orgid: null,
        username4unit: null,
        QRCodeVisible: null,
        MultiQRCodeVisible: null,
        multipleSelection: [],
        multipleSelection2: [],
        multipleSelectionids: [],
        taskAssign: Object.assign({}, task),
        taskVisible: null,
      }
    },
    created(){
      this.api = process.env.BASE_API+"/upload/excel";
      this.orgid = store.getters.orgid;
      this.username4unit = store.getters.username4unit;
      this.getList();
      this.getUserList();
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      createQRcode(id,qrcode) {
        new QRCode(id, {
        text: qrcode,
        width: 100,
        height: 100
      });
      },
      closeCode() {
        // 这里是清空每一个二维码框的内容
        const codeList = document.querySelectorAll('.qrcode')
        for (let i = 0; i < codeList.length; i++) {
          codeList[i].innerHTML = ''
        }
      },
      getUserList(){
        fetchUser(this.listQuery, store.getters.orgid).then(response =>{
          this.userlist = response.data.list;
        });
      },
      getList(){
        var orgid = store.getters.orgid;
        this.listloading = true;
        fetchAsset(this.listQuery, orgid).then(response =>{
          this.listloading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      downloadexcel(){
        var downloadurl = '47.118.51.178:8090/资产台账-数据导出1114.xlsx'; //待改进
        window.open(downloadurl);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.newList = Object.assign({},userListing);
        this.newList.orgid = store.getters.orgid;
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.newList = Object.assign({},row);
        this.newList.orgid = store.getters.orgid;
        var qrcode = process.env.BASE_API+"?orgid="+this.newList.orgid+"&code4GS1="+this.newList.code4gs1;
        this.closeCode();
        this.$nextTick(function(){
          this.createQRcode("qrCode",qrcode);
        })
      },
      handleQRCode(index, row){
        this.QRCodeVisible = true;
        this.newList = Object.assign({},row);
        this.newList.orgid = store.getters.orgid;
        var qrcode = process.env.BASE_API+"?orgid="+this.newList.orgid+"&code4GS1="+this.newList.code4gs1;
        this.closeCode();
        this.$nextTick(function(){
          this.createQRcode("qrCode",qrcode);
        })
      },
      printQRCode(){
        print({ printable: 'printqrcode', type: 'html' , header: 'test-print-js',style: '@page {size: 4.25in 2.36in;};',});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该单位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAsset(row.assetid).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateAsset(this.newList).then(() => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createAsset(this.newList).then(() => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      handleTaskDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          createAssetCheckTask(this.taskAssign).then(() => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.taskVisible =false;
            this.getList();
          })
        })
      },
      handleBatchOperate() {
        if(this.operateType==null){
          this.$message({
            message: '请选择操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的商品',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$confirm('是否要进行该批量操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].assetid);
          }
          switch (this.operateType) {
            case this.operates[0].value:
              this.multiPrintQRCode(); //批量打印
              break;
            case this.operates[1].value:
              this.assetTaskAssign();      //发布资产盘点任务
              break;
            default:
              break;
          }
          this.getList();
        });
      },
      assetTaskAssign(){  //发布资产盘点任务
        this.multipleSelection2 = this.multipleSelection;
        this.taskAssign.assetid = [];
        for(let i=0; i<this.multipleSelection2.length; i++){
          this.taskAssign.assetid.push(this.multipleSelection2[i].assetid);
        }
        this.taskVisible = true;
        this.taskAssign.orgid = this.orgid;
        this.taskAssign.username4unit = this.username4unit;
      },
      multiPrintQRCode(){
        this.multipleSelection2 = this.multipleSelection;
        this.MultiQRCodeVisible = true;
        this.closeCode();
        this.multipleSelectionids = [];

        for(let i=0; i<this.multipleSelection2.length;i++){
          this.$nextTick(function(){
          var qrid = "qrCode"+this.multipleSelection2[i].assetid;
          var qrid2 = "printqrcode"+this.multipleSelection2[i].assetid;
          this.multipleSelectionids.push(qrid2);
          var qrurl = process.env.BASE_API+"?orgid="+this.multipleSelection2[i].orgid+"&code4GS1="+this.multipleSelection2[i].code4gs1;
          this.createQRcode(qrid,qrurl);
        })
        }
      },
      MultiPrint(){
        print({ printable: ['multiprint'], type: 'html',style: '@page {size: 4.25in 2.36in;};',});
      },
    }
  }
</script>


<style></style>
