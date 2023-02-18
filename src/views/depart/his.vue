<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
     <div class="table-container">
      <el-table ref="unit"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="资产单位代码" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orgid}}</template>
        </el-table-column>
        <el-table-column label="记录号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.assetid}}</template>
        </el-table-column>
        <el-table-column label="资产编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetname}}</template>
        </el-table-column>
        <el-table-column label="资产名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.assetcode}}</template>
        </el-table-column>
        <el-table-column label="盘点结果" width="100" align="center">
          <template slot-scope="scope">{{scope.row.checkresult}}</template>
        </el-table-column>
        <el-table-column label="盘点方式" width="100" align="center">
          <template slot-scope="scope">{{scope.row.checkmode}}</template>
        </el-table-column>
        <el-table-column label="盘点人" width="100" align="center">
          <template slot-scope="scope">{{scope.row.username4unit}}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.updatetime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import store from '@/store';
  import {fetchHis,deleteHis} from '@/api/his';
  const defaultListQuery = {
      pageNum: 1,
      pageSize: 5
    };

  export default {
    data(){
      return{
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        listloading: false,
        total: null,
        isEdit: false,
        taskid: null,
      }
    },
    created(){
      this.taskid = this.$route.query.taskid;
      this.getList();
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList(store.getters.orgid);
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList(store.getters.orgid);
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该活动?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHis(row.assetchkid).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      getList(){
        this.listloading = true;
        fetchHis(this.listQuery, this.taskid).then(response =>{
          this.listloading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          for(let i in this.list){
            //处理盘点结果
            if(this.list[i].checkresult==0){
              this.list[i].checkresult="未盘点";
            }
            else if(this.list[i].checkresult==1){
              this.list[i].checkresult="盘点正确";
            }
            else if(this.list[i].checkresult==3){
              this.list[i].checkresult="盘亏";
            }
            else if(this.list[i].checkresult==5){
              this.list[i].checkresult="盘盈";
            }
          }
        });
      },
    }
  }


</script>

<style></style>

