<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách tài khoản</p>
        <p class="Text-tile-2">Trang chủ ● tài khoản</p>
      </div>
      <div class="col-md-6 float-right">
        <button type="button" class="btn btn-primary float-right btn-add" @click="CreateNewAccount()">
          <i class="cil-plus"></i>
          Thêm mới
        </button>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <div style="display: flex;">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          style="box-shadow: none" v-model="search" />
        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchUser()">
          <i class="cil-magnifying-glass"></i>
        </button>
      </div>

    </nav>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên đăng nhập</th>
          <th scope="col">Tên người dùng</th>
          <th scope="col">Điện thoại</th>
          <!-- <th scope="col">Trạng thái</th> -->
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getData" :key="index" @click="detailAccount(item.id)">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.username }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.phone }}</td>
          <!-- <td>{{ item.userStatus }}</td> -->
          <td class="td-table td-action">
            <button type="button" class="btn btn-danger btn-size" @click="deleteAccount(item.id)">
              <i class="cil-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
      getData: "",
      search: ""
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    CreateNewAccount() {
      this.$router.push({
        name: "Tạo mới tài khoản",
      });
    },
    detailAccount(id) {
      console.log(id);
      this.$router.push({
        name: "Chi tiết tài khoản",
        params: { item: id },
      });
    },
    deleteAccount(item) {
      console.log(item)
      axios
        .delete(this.$store.state.MainLink + "User/" + item)
        .then((response) => {
          // this.getData = response.data;
          console.log('Xóa thành công!');
          this.getAllProduct();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "User/GetAll")
        .then((response) => {
          this.getData = response.data;
          console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchUser() {
      axios
        .get(this.$store.state.MainLink + "User/Search?prefix=" + this.search)
        .then((response) => {
          this.getData = response.data;
          console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
