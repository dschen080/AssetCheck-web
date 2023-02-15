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
        <el-table-column label="任务摘要" width="150" align="center">
          <template slot-scope="scope">{{scope.row.taskabstract}}</template>
        </el-table-column>
        <el-table-column label="盘点开始时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.taskbegin}}</template>
        </el-table-column>
        <el-table-column label="盘点结束时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.taskend}}</template>
        </el-table-column>
        <el-table-column label="任务发起人id" width="120" align="center">
          <template slot-scope="scope">{{scope.row.username4unit}}</template>
        </el-table-column>
        <el-table-column label="盘点总数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.checksum}}</template>
        </el-table-column>
        <el-table-column label="盘点正确数量" width="120" align="center">
          <template slot-scope="scope">{{scope.row.checked}}</template>
        </el-table-column>
        <el-table-column label="盘亏数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.loss}}</template>
        </el-table-column>
        <el-table-column label="待盘点数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.tobechecked}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createtime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleView(scope.$index, scope.row)">
              查看
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
  import {fetchAssetCheckTask,deleteAssetCheckTask} from '@/api/task';
  import store from '@/store';
  const defaultListQuery = {
      pageNum: 1,
      pageSize: 5,
      keyword: null
    };
  export default {
    data(){
      return{
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        listloading: false,
        dialogVisible: false,
        total: null,
        isEdit: false,
        orgid: null,
      }
    },
    created(){
      this.getList(store.getters.orgid);
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
          deleteAssetCheckTask(row.taskid).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList(store.getters.orgid);
          });
        });
      },
      handleView(index, row) {
        this.$router.push({path: '/unit/his', query: {taskid: row.taskid}})
      },
      getList(orgid){
        this.listloading = true;
        fetchAssetCheckTask(this.listQuery, orgid).then(response =>{
          this.listloading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
    }
  }

</script>
