<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加资产单位</el-button>
    </el-card>

    <div class="table-container">
      <el-table ref="unit"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="资产单位代码" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orgid}}</template>
        </el-table-column>
        <el-table-column label="单位全名" width="300" align="center">
          <template slot-scope="scope">{{scope.row.unitname}}</template>
        </el-table-column>
        <el-table-column label="单位类型" width="150" align="center">
          <template slot-scope="scope">{{scope.row.usertype}}</template>
        </el-table-column>
        <el-table-column label="单位联系人" width="150" align="center">
          <template slot-scope="scope">{{scope.row.contact}}</template>
        </el-table-column>
        <el-table-column label="联系电话" width="200" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="备注"  align="center">
          <template slot-scope="scope">{{scope.row.notes}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="150" align="center">
          <template slot-scope="scope">{{scope.row.createtime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleView(scope.$index, scope.row)">
              查看
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

    <el-dialog
      title="添加资产单位信息"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="newList"
               ref="newListForm"
               label-width="150px" size="small">
        <el-form-item label="资产单位代码：">
          <el-input v-model="newList.orgid" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="单位全名：">
          <el-input v-model="newList.unitname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="单位类型：">
          <el-input v-model="newList.usertype"  style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="单位联系人：">
          <el-input v-model="newList.contact"  style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="newList.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="newList.notes" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
  import {fetchOrg,createOrg,updateOrg,deleteOrg} from '@/api/root';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: null
  };
  const orgListing = {
    orgid: null,
    unitname: null,
    usertype: null,
    contact: null,
    phone: null,
    notes: null
  }
  export default {
    data(){
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        listloading: false,
        dialogVisible: false,
        total: null,
        newList:Object.assign({}, orgListing),
        isEdit: false
      }
    },
    created(){
      this.getList();
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
      getList(){
        this.listloading = true;
        fetchOrg(this.listQuery).then(response =>{
          this.listloading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.newList = Object.assign({},orgListing);
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.newList = Object.assign({},row);
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该单位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrg(row.orgid).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleView(index, row) {
        this.$router.push({path: '/root/user', query: {orgid: row.orgid}})
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateOrg(this.newList).then(() => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createOrg(this.newList).then(() => {
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
    }
  }
</script>


<style></style>
