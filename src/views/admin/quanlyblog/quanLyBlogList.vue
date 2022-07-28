<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách sự kiện</p>
        <p class="Text-tile-2">Trang chủ ● Sự kiện</p>
      </div>
      <div class="col-md-6 float-right">
        <button type="button" class="btn btn-primary float-right btn-add" @click="CreateNewProduct()">
          <i class="cil-plus"></i>
          Thêm mới
        </button>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          style="box-shadow: none" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          <i class="cil-magnifying-glass"></i>
        </button>
      </form>
    </nav>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên sự kiện</th>
          <th scope="col">Mô tả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getData" :key="index" @click="detailEvent(item.id)">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
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
      formData: {
        name: "",
        price: "",
        status: "",
        orderDetails: "",
        blogs: "",
        productCategories: "",
        sales: "",
        productColors: [],
        cartDetails: "",
        productDetails: [],
      },
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    CreateNewProduct() {
      this.$router.push({
        name: "Thêm mới sản phẩm",
      });
    },
    detailEvent(id) {
      console.log(id);
      this.$router.push({
        name: "Thông tin chi tiết Blog",
        params: { item: id },
      });
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "Event/GetAll")
        .then((response) => {
          this.getData = response.data;
          console.log(this.getData);
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
