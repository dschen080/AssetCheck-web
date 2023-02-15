<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表.</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加单位资产管理员</el-button>
    </el-card>

    <div class="table-container">
      <el-table ref="unit"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="资产单位代码" width="120" align="center">
          <template slot-scope="scope">{{scope.row.orgid}}</template>
        </el-table-column>
        <el-table-column label="员工id" width="100" align="center">
          <template slot-scope="scope">{{scope.row.username4unit}}</template>
        </el-table-column>
        <el-table-column label="真实姓名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.realname}}</template>
        </el-table-column>
        <el-table-column label="用户名类型" width="150" align="center">
          <template slot-scope="scope">{{scope.row.usertype}}</template>
        </el-table-column>
        <el-table-column label="联系电话" width="180" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="部门" width="200" align="center">
          <template slot-scope="scope">{{scope.row.sectname}}</template>
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
      title="添加单位管理员信息"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="newList"
               ref="newListForm"
               label-width="150px" size="small">
        <el-form-item label="员工id:">
          <el-input v-model="newList.username4unit" :disabled="orgiddisabled" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="newList.passwd" :disabled="passwddisabled" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model="newList.realname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="newList.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model="newList.sectname" :disabled="sectdisabled" style="width: 250px"></el-input>
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
  import {fetchUser,createUser,updateUser,deleteUser} from '@/api/root_user';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: null
  };
  const userListing = {
    orgid: null,
    username4unit: null,
    passwd: null,
    realname: null,
    usertype: null,
    phone: null,
    sectname: null,
    notes: null
  }
  export default {
    data(){
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        listloading: false,
        dialogVisible: false,
        orgiddisabled: false,
        passwddisabled: false,
        sectdisabled: false,
        total: null,
        newList:Object.assign({}, userListing),
        isEdit: false
      }
    },
    created(){
      this.getList(this.$route.query.orgid);
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList(this.$route.query.orgid);
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList(this.$route.query.orgid);
      },
      getList(orgid){
        this.listloading = true;
        fetchUser(this.listQuery, orgid).then(response =>{
          this.listloading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          for(let i in this.list){
            if(this.list[i].usertype==1){
              this.list[i].usertype="单位资产管理员";
            }
            else if(this.list[i].usertype==3){
              this.list[i].usertype="部门资产管理员";
            }
            else if(this.list[i].usertype==5){
              this.list[i].usertype="资产负责人(使用人)";
            }
          }
        });
      },
      handleAdd() {
        this.orgiddisabled = false;
        this.passwddisabled = false;
        this.dialogVisible = true;
        this.isEdit = false;
        this.newList = Object.assign({},userListing);
        this.newList.orgid = this.$route.query.orgid;
        this.sectdisabled = true;
      },
      handleUpdate(index, row) {
        this.orgiddisabled = true;
        this.passwddisabled = true;
        this.dialogVisible = true;
        this.isEdit = true;
        this.newList = Object.assign({},row);
        this.newList.orgid = this.$route.query.orgid;
        this.sectdisabled = false;
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该单位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(row.orgid+row.username4unit).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList(this.$route.query.orgid);
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
            updateUser(this.newList).then(() => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList(this.$route.query.orgid);
            })
          } else {
            createUser(this.newList).then(() => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList(this.$route.query.orgid);
            })
          }
        })
      },
    }
  }
</script>


<style></style>
