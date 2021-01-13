<template>
  <div>
    <div class="form-group">
      <label>Search Skill:</label>
      <input type="text" class="form-control" v-model="search" required />
    </div>
    <h1>Jobs</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Title</td>
          <td>Description</td>
          <td>Skills</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredItem" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ getSkills(item.skills) }}</td>
          <td>
            <router-link
              :to="{ name: 'Edit', params: { id: item.id } }"
              class="btn btn-primary"
              >Edit</router-link
            >
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="deleteItem(item)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import APIService from "../service";
export default {
  data() {
    return {
      items: [],
      search: "",
      filteredItem: [],
    };
  },
  created: function () {
    this.fetchItems();
  },
  watch: {
    search: function (value) {
      if (value) {
        this.filteredItem = [
          ...this.items.filter(
            (item) =>
              item.skills.filter((skill) => skill.match(new RegExp(value)))
                .length
          ),
        ];
      } else {
        this.filteredItem = [...this.items];
      }
    },
  },
  methods: {
    fetchItems() {
      APIService.get(null)
        .then((response) => {
          this.items = response.jobs;
          this.filteredItem = [...this.items];
        })
        .catch((error) => {
          // handle error
          console.error(error);
        });
    },
    getSkills(skills) {
      return skills.join();
    },
    deleteItem(skill) {
      const confirmSelection = confirm("sure wnat to delete" + skill.title);
      if (confirmSelection) {
        APIService.delete(skill.id)
          .then(() => {
            alert("data deleted");
            this.fetchItems;
          })
          .catch((error) => {
            // handle error
            console.error(error);
          });
      }
    },
  },
};
</script>