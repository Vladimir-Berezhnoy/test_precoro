<template>
  <div>
    <a href="#open-modal">Invite User</a>
    <div id="open-modal" class="modal-window">
      <div class="modal" :class="[{ 'modal-adaptive': selectedIndex === 2 }]">
        <header class="modal-header">
          <a href="#" title="Close" class="modal-close"
            ><svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 2C6.92428 2 2 6.92428 2 13C2 19.0757 6.92428 24 13 24C19.0757 24 24 19.0757 24 13C24 6.92428 19.0757 2 13 2ZM0 13C0 5.81972 5.81972 0 13 0C20.1803 0 26 5.81972 26 13C26 20.1803 20.1803 26 13 26C5.81972 26 0 20.1803 0 13ZM8.51956 8.51956C8.91008 8.12904 9.54325 8.12904 9.93377 8.51956L13 11.5858L16.0662 8.51956C16.4568 8.12904 17.0899 8.12904 17.4804 8.51956C17.871 8.91008 17.871 9.54325 17.4804 9.93377L14.4142 13L17.4804 16.0662C17.871 16.4568 17.871 17.0899 17.4804 17.4804C17.0899 17.871 16.4568 17.871 16.0662 17.4804L13 14.4142L9.93377 17.4804C9.54325 17.871 8.91008 17.871 8.51956 17.4804C8.12904 17.0899 8.12904 16.4568 8.51956 16.0662L11.5858 13L8.51956 9.93377C8.12904 9.54325 8.12904 8.91008 8.51956 8.51956Z"
                fill="rgba(29, 36, 82, 0.5)"
              />
            </svg>
          </a>
          <h2 class="modal-title">Invite User</h2>
          <div class="tabs flex-container">
            <div
              v-for="(tab, i) in tabs"
              :key="i"
              class="tabs-container flex-container"
              :class="[
                { 'active-tab': selectedIndex === i },
                {
                  'tab-disabled':
                    i !== 0 && !isValidForms[Object.keys(isValidForms)[i - 1]],
                },
              ]"
              @click="onHeaderTab(i)"
            >
              <span
                class="tabs-index flex-container"
                :class="[
                  { 'tabs-selected': selectedIndex === i },
                  { 'tabs-index-done': selectedIndex > i || disabled},
                ]"
              >
                <p v-if="selectedIndex <= i && !disabled">
                  {{ i + 1 }}
                </p>
                <svg
                  v-else
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.40039 7.2001L4.80039 9.6001L10.8004 3.6001"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <p
                class="tabs-title"
                :class="[{ 'tabs-selected': selectedIndex === i }]"
              >
                {{ tab }}
              </p>
            </div>
          </div>
        </header>
        <body class="modal-body">
          <form class="form">
            <!-- Main info form -->
            <section class="form-main" v-if="selectedIndex == 0">
              <label>
                First Name
                <input
                  type="text"
                  v-model="userData.mainInfo.firstName"
                  class="form-input"
                  required
                  :disabled="disabled"
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  v-model="userData.mainInfo.lastName"
                  class="form-input"
                  required
                  :disabled="disabled"
                />
              </label>
              <label>
                Email Address
                <input
                  type="email"
                  v-model="userData.mainInfo.email"
                  class="form-input"
                  required
                  :disabled="disabled"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  v-model="userData.mainInfo.phone"
                  class="form-input"
                  @input="acceptNumber()"
                  required
                  :disabled="disabled"
                />
              </label>
              <label>
                Position
                <input
                  type="text"
                  v-model="userData.mainInfo.position"
                  class="form-input"
                  required
                  :disabled="disabled"
                />
              </label>
              <label>
                Available in company
                <select class="form-input" v-model="userData.mainInfo.company" :disabled="disabled">
                  <option
                    v-for="(company, i) in availableCompanies"
                    :value="company"
                    :key="i"
                  >
                    {{ company }}
                  </option>
                </select>
              </label>
            </section>
            <!-- Locations form -->
            <section class="form-locations" v-if="selectedIndex == 1">
              <label style="margin-bottom: 25px">
                <p>Main Location <span style="color: #f5455a">*</span></p>
                <select
                  class="form-input"
                  v-model="userData.locations.mainLocation"
                  :disabled="disabled"
                >
                  <option
                    v-for="(location, i) in availableMainLocations"
                    :value="location"
                    :key="i"
                  >
                    {{ location }}
                  </option>
                </select>
              </label>
              <div class="flex-container" style="margin-bottom: 20px">
                <input
                  type="checkbox"
                  class="locations-input checkbox"
                  id="selectAll"
                  v-model="selectAll"
                  :disabled="disabled"
                />
                <label for="selectAll" class="locations-label"
                  >Select All Locations</label
                >
              </div>

              <div>
                <p class="input-title">Available Locations</p>
                <div class="flex-container locations-container">
                  <div
                    v-for="(location, i) in availableLocations"
                    :key="i"
                    class="flex-container locations-input-container"
                  >
                    <input
                      type="checkbox"
                      class="locations-input checkbox"
                      :id="location + i"
                      :value="location"
                      v-model="userData.locations.allLocations"
                      :disabled="disabled"
                    />
                    <label :for="location + i" class="locations-label available-location">{{
                      location
                    }}</label>
                  </div>
                </div>
              </div>
            </section>
            <!-- Roles form -->
            <section class="form-roles" v-if="selectedIndex == 2">
              <div class="form-roles-container">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Access to:</th>
                      <th v-for="(name, i) in roles.access" :key="i">
                        {{ name }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="font-weight: 600; padding-bottom: 8px">
                        All bellow
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          class="locations-input"
                          v-model="selectAllControls.selectAllView"
                          :disabled="disabled"
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          class="locations-input"
                          v-model="selectAllControls.selectAllCreate"
                          :disabled="disabled"
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          class="locations-input"
                          v-model="selectAllControls.selectAllApprove"
                          :disabled="disabled"
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          class="locations-input"
                          v-model="selectAllControls.selectAllPay"
                          :disabled="disabled"
                        />
                      </td>
                    </tr>
                    <tr v-for="(role, i) in roles.rolesCollection" :key="i">
                      <td style="padding: 8px 0">{{ role.name }}</td>
                      <td v-for="(access, j) in role.accesses" :key="j">
                        <input
                          type="checkbox"
                          class="locations-input"
                          :value="role.name"
                          v-model="
                            userData.roles[Object.keys(userData.roles)[j]]
                          "
                          :disabled="disabled"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <section class="management-section">
                  <p class="management-title">
                    Management:
                    <svg
                      style="margin-left: 5px"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 3.75C7.44321 3.75 3.75 7.44321 3.75 12C3.75 16.5568 7.44321 20.25 12 20.25C16.5568 20.25 20.25 16.5568 20.25 12C20.25 7.44321 16.5568 3.75 12 3.75ZM2.25 12C2.25 6.61479 6.61479 2.25 12 2.25C17.3852 2.25 21.75 6.61479 21.75 12C21.75 17.3852 17.3852 21.75 12 21.75C6.61479 21.75 2.25 17.3852 2.25 12ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V9C12.75 9.41421 12.4142 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V12C11.25 11.5858 11.5858 11.25 12 11.25Z"
                        fill="#676F8F"
                      />
                    </svg>
                  </p>
                  <div>
                    <div class="management-container">
                      <div class="flex-container management-item">
                        <input
                          type="checkbox"
                          class="locations-input"
                          id="test3"
                          v-model="selectAllControls.selectAllManagement"
                          :disabled="disabled"
                        />
                        <label
                          for="test3"
                          class="management-label management-label-bold"
                          >All bellow</label
                        >
                      </div>
                      <div
                        v-for="(item, i) in roles.management"
                        :key="i"
                        class="flex-container management-item"
                      >
                        <input
                          type="checkbox"
                          class="locations-input"
                          :id="item + i"
                          :value="item"
                          v-model="userData.management"
                          :disabled="disabled"
                        />
                        <label :for="item + i" class="management-label">{{
                          item
                        }}</label>
                      </div>
                    </div>
                    <div>
                      <div class="flex-container management-item">
                        <input
                          type="checkbox"
                          class="locations-input"
                          id="admin"
                          value="Admin"
                          v-model="userData.isAdmin"
                          :disabled="disabled"
                        />
                        <label
                          for="admin"
                          class="management-label"
                          style="flex-direction: row; align-items: center"
                          >Admin (Full access)
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 9V13.5M12 16.5V17M4.38254 21H19.6175C21.1387 21 22.103 19.3691 21.3699 18.0362L13.7524 4.18624C12.9926 2.80469 11.0074 2.80469 10.2476 4.18624L2.63011 18.0362C1.89701 19.3691 2.86134 21 4.38254 21Z"
                              stroke="#EA9210"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div class="roles-description">
                <svg
                  class="roles-description-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Info" opacity="0.5">
                    <path
                      id="Vector"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 3.75C7.44321 3.75 3.75 7.44321 3.75 12C3.75 16.5568 7.44321 20.25 12 20.25C16.5568 20.25 20.25 16.5568 20.25 12C20.25 7.44321 16.5568 3.75 12 3.75ZM2.25 12C2.25 6.61479 6.61479 2.25 12 2.25C17.3852 2.25 21.75 6.61479 21.75 12C21.75 17.3852 17.3852 21.75 12 21.75C6.61479 21.75 2.25 17.3852 2.25 12ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V9C12.75 9.41421 12.4142 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V12C11.25 11.5858 11.5858 11.25 12 11.25Z"
                      fill="#1D2452"
                    />
                  </g>
                </svg>
                <p>
                  The user becomes a
                  <span class="roles-description-active">Power user</span> if at
                  least ONE of the following roles is selected: Approve, View
                  only, Configuration, Suppliers and Items, Budgets, Warehouse
                  manager.
                </p>
              </div>
            </section>
          </form>
        </body>
        <footer
          class="flex-container modal-footer"
          :style="[
            this.selectedIndex !== 0 ? { 'justify-content': 'end' } : {},
          ]"
        >
          <div
            class="flex-container switcher-container"
            v-if="this.selectedIndex == 0"
          >
            <div>
              <input
                type="checkbox"
                id="switch"
                class="switcher-input"
                v-model="userData.isActive"
                :disabled="disabled"
              /><label for="switch" class="switcher">Toggle</label>
            </div>
            <p class="switcher-description">Active in all companies</p>
            <span class="switcher-info" title="Info"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Info" opacity="0.5">
                  <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3.75C7.44321 3.75 3.75 7.44321 3.75 12C3.75 16.5568 7.44321 20.25 12 20.25C16.5568 20.25 20.25 16.5568 20.25 12C20.25 7.44321 16.5568 3.75 12 3.75ZM2.25 12C2.25 6.61479 6.61479 2.25 12 2.25C17.3852 2.25 21.75 6.61479 21.75 12C21.75 17.3852 17.3852 21.75 12 21.75C6.61479 21.75 2.25 17.3852 2.25 12ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V9C12.75 9.41421 12.4142 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V12C11.25 11.5858 11.5858 11.25 12 11.25Z"
                    fill="#1D2452"
                  />
                </g>
              </svg>
            </span>
          </div>
          <button
            v-if="selectedIndex !== 2"
            @click="onHeaderTab(selectedIndex + 1)"
            :class="{
              disabled: !isValidForms[Object.keys(isValidForms)[selectedIndex]],
            }"
          >
            next step
          </button>
          <button v-else @click="submitForm()">invite user</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      modal: false,
      disabled: false,
      selectedIndex: 0,
      selectAll: false,
      selectAllControls: {
        selectAllView: false,
        selectAllCreate: false,
        selectAllApprove: false,
        selectAllPay: false,
        selectAllManagement: false,
      },
      test: [],
      isValidForms: {
        mainInfo: false,
        locations: false,
        roles: true,
      },
      roles: {
        access: ["View only", "Create", "Approve", "Pay"],
        rolesCollection: [
          {
            name: "Warehouse requests",
            accesses: ["View only", "Create", "Approve"],
          },
          {
            name: "Purchase requests",
            accesses: ["View only", "Create", "Approve"],
          },
          {
            name: "Request for proposals",
            accesses: ["View only", "Create", "Approve"],
          },
          {
            name: "Purchase orders",
            accesses: ["View only", "Create", "Approve"],
          },
          {
            name: "Receipts",
            accesses: ["View only", "Create", "Approve"],
          },
          {
            name: "Invoices",
            accesses: ["View only", "Create", "Approve", "Pay"],
          },
          {
            name: "Expenses",
            accesses: ["View only", "Create", "Approve", "Pay"],
          },
        ],
        management: [
          "Configuration",
          "Suppliers and items",
          "Budgets",
          "Warehouse manager",
          "Reports",
        ],
      },
      tabs: ["main info", "available locations", "roles"],
      availableCompanies: ["Precoro", "Precoro2", "Precoro3", "Precoro4"],
      availableMainLocations: [
        "Main Precoro US",
        "Main Precoro2 US",
        "Main Precoro3 US",
        "Main Precoro4 US",
      ],
      availableLocations: [
        "Berlin",
        "Venice Office",
        "USA Office",
        "Canada",
        "Poland Office",
        "Ukraine Kyiv Lukivska 7 Main Office",
        "Mexico",
      ],
      availableAccess: [
        "Warehouse requests",
        "Purchase requests",
        "Request for proposals",
        "Purchase orders",
        "Receipts",
        "Invoices",
        "Expenses",
      ],
      userData: {
        isActive: false,
        mainInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          company: "",
        },
        locations: {
          mainLocation: "",
          allLocations: [],
        },
        roles: {
          view: [],
          create: [],
          approve: [],
          pay: [],
        },
        management: [],
        isAdmin: false,
      },
      mainInfoFG: {},
      locationsFG: {},
    };
  },

  mounted() {
    this.mainInfoFG = this.userData.mainInfo;
    this.locationsFG = this.userData.locations;
  },

  watch: {
    mainInfoFG: {
      deep: true,
      handler: function () {
        this.validateForm(this.userData.mainInfo, "mainInfo");
      },
    },

    locationsFG: {
      deep: true,
      handler: function () {
        this.validateForm(this.userData.locations, "locations");
      },
    },

    selectAll(val) {
      val
        ? (this.userData.locations.allLocations = this.availableLocations)
        : this.userData.locations.allLocations;
    },

    "selectAllControls.selectAllView": function (val) {
      this.selectAllValidationCheck("view", "View only", val);
    },

    "selectAllControls.selectAllCreate": function (val) {
      this.selectAllValidationCheck("create", "Create", val);
    },

    "selectAllControls.selectAllApprove": function (val) {
      this.selectAllValidationCheck("approve", "Approve", val);
    },

    "selectAllControls.selectAllPay": function (val) {
      this.selectAllValidationCheck("pay", "Pay", val);
    },

    "selectAllControls.selectAllManagement": function (val) {
      this.selectAllValidationCheckManagement(val);
    },

    "userData.locations.allLocations": function (val) {
      if (this.selectAll) {
        if (val.length !== this.availableLocations.length) {
          this.selectAll = false;
        }
      }
    },

    "userData.roles.view": function (val, oldVal) {
      this.selectAllValidationUncheck("selectAllView", val, oldVal);
    },

    "userData.roles.create": function (val, oldVal) {
      this.selectAllValidationUncheck("selectAllCreate", val, oldVal);
    },

    "userData.roles.approve": function (val, oldVal) {
      this.selectAllValidationUncheck("selectAllApprove", val, oldVal);
    },

    "userData.roles.pay": function (val, oldVal) {
      this.selectAllValidationUncheck("selectAllPay", val, oldVal);
    },

    "userData.management": function (val, oldVal) {
      this.selectAllValidationUncheck("selectAllManagement", val, oldVal);
    },
  },

  methods: {
    onHeaderTab(i) {
      if (i < this.selectedIndex) {
        this.selectedIndex = i;
      } else if (this.isValidForms[Object.keys(this.isValidForms)[i - 1]]) {
        this.selectedIndex = i;
      }
    },

    acceptNumber() {
      var x = this.userData.mainInfo.phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.userData.mainInfo.phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },

    validateForm(form, valid) {
      const values = Object.values(form);
      for (let i = 0; i < values.length; i++) {
        if (values[i] == "") {
          this.isValidForms[valid] = false;
          i = values.length;
          break;
        }
        i == values.length - 1 ? (this.isValidForms[valid] = true) : valid;
      }
    },

    selectAllValidationCheck(formControl, formName, val) {
      if (val) {
        this.userData.roles[formControl] = [];
        JSON.parse(JSON.stringify(this.roles.rolesCollection)).forEach(
          (element) => {
            if (element.accesses.includes(formName)) {
              this.userData.roles[formControl].push(element.name);
            }
          }
        );
      }
    },

    selectAllValidationUncheck(formControl, value, oldValue) {
      if (this.selectAllControls[formControl]) {
        if (value.length < oldValue.length) {
          this.selectAllControls[formControl] = false;
        }
      }
    },

    selectAllValidationCheckManagement(val) {
      if (val) {
        this.userData.management = [];
        JSON.parse(JSON.stringify(this.roles.management)).forEach((element) => {
          this.userData.management.push(element);
        });
      }
    },

    submitForm() {
      this.disabled = true;
      console.log(JSON.parse(JSON.stringify(this.userData)));
    },
  },
};
</script>

<style lang="scss">
// Modal styles begins

.modal-window {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  overflow-y: auto;
  &:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  & > .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: 0px 8px 16px rgba(54, 62, 113, 0.24);
    border-radius: 16px;
    max-width: 870px;
    width: 80%;
  }
}

.modal-close {
  position: absolute;
  right: 25px;
  top: 25px;
  &:hover path {
    fill: $main-blue-dark;
  }
}

// Modal styles ends

// Modal content styles begins

.modal {
  &-title {
    font-weight: 600;
    font-size: 24px;
    color: $main-blue-dark;
    text-align: left;
    margin-bottom: 15px;
  }
  &-header {
    padding: 25px 40px 0 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  &-body {
    padding: 25px 25px 35px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  &-footer {
    padding: 20px 25px 25px;
    justify-content: space-between;
  }
}

// Tabs styles begins

.tabs {
  gap: 25px;
  &-container {
    gap: 8px;
    padding-bottom: 15px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }
  &-index {
    font-weight: 600;
    font-size: 14px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #5e6a75;
    background-color: rgba(65, 90, 218, 0.05);
    justify-content: center;
    &-done {
      background-color: $main-active;
    }
  }
  &-title {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 16px;
  }
  &-selected {
    color: $main-active;
  }
}

.tab-disabled {
  color: $main-blue-light;
  cursor: default;
}

.active-tab {
  border-bottom: 2px solid $main-active;
  padding-bottom: 15px;
  cursor: default;
}

// Tabs styles ends

// Form styles begins

.form {
  text-align: left;
  &-main {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &-roles {
    &-container {
      display: flex; 
      margin-bottom: 30px
    }
  }
}

// Form styles ends

.locations {
  &-container {
    flex-wrap: wrap;
    width: 40%;
    > div {
      flex: 40%;
    }
  }
  &-input {
    margin: 0;
    margin-right: 8px;
    flex-shrink: 0;
    &-container {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
  &-label {
    font-size: 16px;
    color: $main-blue-dark;
    font-weight: 500;
    flex-shrink: 0;
  }
}

.input-title {
  font-size: 16px;
  font-weight: 600;
  color: $main-blue-light;
  margin-bottom: 10px;
}

.table {
  padding-right: 35px;
  border-right: 1px solid #dddee5;
}

.management {
  &-section {
    padding-top: 2px;
    padding-left: 35px;
  }
  &-title {
    display: flex;
    align-items: center;
    margin-bottom: 27px;
    font-weight: 500;
    color: #676f8f;
  }
  &-item {
    padding: 0.59rem 0;
  }
  &-container {
    margin-bottom: 2.37rem;
  }
  &-label {
    font-weight: 500;
    color: #1d2452;
    font-size: 16px;
    &-bold {
      font-weight: 600;
    }
  }
}

.management-container .management-item:first-child {
  padding-top: 0;
  padding-bottom: 0.4rem;
}

.roles-description {
  background-color: rgba(244, 244, 255, 0.5);
  border-radius: 8px;
  width: 80%;
  color: rgba(29, 36, 82, 0.5);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  &-icon {
    margin-right: 10px;
    transform: scale(1.7);
  }
  &-active {
    color: $main-active;
    text-decoration: underline;
    cursor: pointer;
  }
}

// Switcher styles begins

.switcher {
  cursor: pointer;
  text-indent: -9999px;
  width: 44px;
  height: 24px;
  background: grey;
  display: block;
  border-radius: 12px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  &-container {
    gap: 8px;
  }
  &-description {
    color: $main-blue-dark;
    font-size: 16px;
    font-weight: 500;
  }
  &-input {
    display: none;
    &:checked + label {
      background: $main-active;
      &:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }
    }
  }
  &-info {
    width: 24px;
    height: 24px;
  }
}

// Media styles begins

@media screen and (max-width: 980px) {

  .table {
    padding: 0;
    border: none;
    margin-bottom: 15px;
  }

  .form-roles-container {
    display: block;
    margin-bottom: 15px;
  }

  .management {
    &-section {
      padding: 0;
    }
    &-title {
      margin-bottom: 15px;
    }
    &-container {
      margin-bottom: 0;
    }
  }

  .roles-description {
    width: 100%;
  }

}

@media screen and (max-width: 950px) {
  .modal-window > .modal {
    max-width: 500px;
  }

  .modal-window > .modal-adaptive {
    top: auto;
    transform: translate(-50%, 0);
  }

  .locations-container {
    width: 65%;
  }

}

@media screen and (max-width: 700px) {
  
}

@media screen and (max-width: 610px) {
  .tabs-title {
    max-width: 80px;
  }

  .locations-container {
    width: 100%;
  }

  .flex-container  .available-location {
    display: block;
    width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media screen and (max-width: 500px) {
  .switcher-description {
    max-width: 100px;
  }

  .form-main {
    display: block;
    label:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .tabs-index {
    display: none;
  }

  td {
    max-width: 50px;
    word-wrap: break-word;
    font-size: 14px;
  }

  th {
    max-width: 73px;
    font-size: 14px;
  }

  .management {
    &-title {
      font-size: 14px;
    }
    &-label {
      font-size: 14px;
    }
  }

.roles-description {
  font-size: 12px;
  &-icon {
    display: none;
  }
}

}

@media screen and (max-width: 430px) {

  .modal-body {
    padding-left: 10px;
    padding-right: 10px;
  }

  .table th {
    max-width: 60px;
    word-wrap: break-word;
  }

  .modal-window > .modal {
    width: 100%;
  }

  .switcher-info {
    display: none;
  }

  .locations-container {
    display: block;
  }

  .flex-container .available-location {
    width: 275px;
    display: block;
  }
}

@media screen and (max-width: 365px) {
  .switcher-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .flex-container .available-location {
    width: 195px;
  }
}
</style>
