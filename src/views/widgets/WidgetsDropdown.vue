<template>
  <CRow>
    <CCol sm="6" lg="4" @click="moveToUser()">
      <CWidgetDropdown color="primary" header="" text="Tổng số người dùng">
        <template #default>
          {{ countUser }}
        </template>
        <template #footer>
          <CChartLineSimple pointed class="mt-3 mx-3" style="height:70px" :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="primary" label="Members" labels="months" />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="4" @click="moveToGroup()">
      <CWidgetDropdown color="info" header="" text="Tổng số nhóm">
        <template #default>
          {{ countGroup }}
        </template>
        <template #footer>
          <CChartLineSimple pointed class="mt-3 mx-3" style="height:70px" :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info" :options="{ elements: { line: { tension: 0.00001 } } }" label="Members"
            labels="months" />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="4" @click="moveToEvent()">
      <CWidgetDropdown color="warning" header="" text="Tổng số sự kiện">
        <template #default>
          {{ countEvent }}
        </template>
        <template #footer>
          <CChartLineSimple class="mt-3" style="height:70px" background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]" :options="{ elements: { line: { borderWidth: 2.5 } } }"
            point-hover-background-color="warning" label="Members" labels="months" />
        </template>
      </CWidgetDropdown>
    </CCol>
    <!-- <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="danger"
        header="9.823"
        text="Members online"
      >
        <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
             <CIcon name="cil-settings"/>
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height:70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol> -->
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js';
import axios from "axios";

export default {
  name: 'WidgetsDropdown',
  components: { CChartLineSimple, CChartBarSimple },
  data() {
    return {
      // getData: "",
      // search: "",
      countUser: 0,
      countGroup: 0,
      countEvent: 0
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      axios
        .get(this.$store.state.MainLink + "User/GetAll")
        .then((response) => {
          this.countUser = response.data.length;
        })
        .catch((e) => {
          console.log(e);
        });
      axios
        .get(this.$store.state.MainLink + "Group/GetAll")
        .then((response) => {
          this.countGroup = response.data.length;
        })
        .catch((e) => {
          console.log(e);
        });
      axios
        .get(this.$store.state.MainLink + "Event/GetAll")
        .then((response) => {
          this.countEvent = response.data.length;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    moveToUser() {
      this.$router.push({
        name: "Danh sách tài khoản",
      });
    },
    moveToGroup() {
      this.$router.push({
        name: "Danh sách sản phẩm",
      });
    },
    moveToEvent() {
      this.$router.push({
        name: "Danh sách Blog",
      });
    }
  }
}
</script>
