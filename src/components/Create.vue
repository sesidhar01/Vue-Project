<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>{{ text }}</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addItem">
          <div class="form-group">
            <label>Title:</label>
            <input
              type="text"
              class="form-control"
              v-model="item.title"
              required
            />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input
              type="text"
              class="form-control"
              v-model="item.description"
              required
            />
          </div>
          <div class="form-group">
            <label>skills:</label>
            <input type="text" class="form-control" v-model="item.skill" />
            <br />
            <input
              type="button"
              :disabled="!item.skill"
              @click="addSkill()"
              class="btn btn-primary"
              value="Add skill"
            />
          </div>
          <div
            class="form-group"
            v-for="(skill, index) in item.skills"
            :key="index"
          >
            <input
              type="text"
              class="form-control"
              :value="skill"
              @keyup="updateSkill(skill, index)"
            />
            <br />
            <input
              type="button"
              class="btn btn-danger"
              value="remove"
              @click="removeSkill(index)"
            />
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" :value="text" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "../service";
export default {
  data() {
    return {
      id: String,
      item: {
        skills: [],
      },
    };
  },
  created() {
    this.$route.params.id;
    if (this.$route.params.id) {
      this.id = parseInt(this.$route.params.id);
      this.getItemByID(this.id);
    } else {
      this.id = "";
    }
  },
  computed: {
    text: function () {
      return `${this.id ? "Edit" : "Add"} Job`;
    },
  },
  watch: {
    "$route.params.id": function (id) {
      this.id = id;
      if (!id) {
        this.item = {
          skills: [],
        };
      } else {
        this.getItemByID(id);
      }
    },
  },
  methods: {
    addItem() {
      if (!this.item.skills.length) {
        alert("please add skill");
        return;
      }
      delete this.item.skill;
      if (this.id) {
        APIService.update(this.id, this.item)
          .then(() => {
            alert("data updated");
            this.$router.push("/");
          })
          .catch((error) => {
            // handle error
            console.error(error);
          });
      } else {
        APIService.insert(this.item)
          .then(() => {
            alert("data inserted");
            this.$router.push("/");
          })
          .catch((error) => {
            // handle error
            console.error(error);
          });
      }
    },
    addSkill() {
      this.item.skills = [...this.item.skills];
      this.item.skills.push(this.item.skill);
      this.item.skill = "";
    },
    updateSkill(skill, index) {
      this.item.skills[index] = skill;
    },
    removeSkill(index) {
      this.item.skills.splice(index, 1);
    },
    getItemByID(id) {
      APIService.get(id)
        .then((response) => {
          this.item = response.job || {};
        })
        .catch((error) => {
          // handle error
          console.error(error);
        });
    },
  },
};
</script>