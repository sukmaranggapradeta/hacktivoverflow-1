<template>
  <div class="row">
    <router-view />
    <NavBar></NavBar>
    <div class="col s12 l3 m3">
      <!-- MENU LEFT BAR -->
      <MenuLeftBar></MenuLeftBar>
    </div>
    <div class="col m6 l6 s12">
      <!-- QUESTION FORM -->
      <div class="row">
        <div class="col s12 m12 l12">
          <h4 class="left border blue-text">{{ question_detail.title }}</h4>
        </div>
        <!-- FOR QUESTION -->
        <div class="row">
          <div class="col s2 m2 l2">
            <div class="row">
              <span @click="upvotes_question(question_detail.author._id)">
                <i class="material-icons">thumb_up</i>
              </span>
            </div>
            <div class="row">
              <h5>{{ upvotes_value.length - downvotes_value.length }}</h5>
            </div>
            <div class="row">
              <span @click="downvotes_question(question_detail.author._id)">
                <i class="material-icons">thumb_down</i>
              </span>
            </div>
          </div>
          <div class="col m10 l10 s10">
            <p v-html="question_detail.description"></p>
          </div>
        </div>
        <div class="row">
          <div class="col s8 m8 l8 offset-m2 offset-l2 offset-s2">
            <TagCard v-for="(tag, index) in question_detail.tags" :key="index" :data_card="tag"></TagCard>
          </div>
        </div>

        <div class="row">
          <div id="picturedisplay" class="row s6 m6 l6">
            <div class="row">
              <div class>
                <span class="relativetime">asked: {{ getDate(question_detail.createdAt) }}</span>
              </div>
            </div>
            <div class="col s1 m1 l1">
              <div class>
                <a href>
                  <div class="gravatar-wrapper-32">
                    <img src="../../public/user1.png" alt width="38" height="38" />
                  </div>
                </a>
              </div>
            </div>
            <div class="col s7 m7 l7">
              <div class>
                <span>{{ question_detail_name }}</span>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div class="row">
          <div class="col m11 l11 s11 offset-s1 offset-m1 offset-l1">
            <div class="col 11">
              <span>{{answers_value.length}} Answers</span>
              <hr />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col m11 l11 s11 offset-s1 offset-m1 offset-l1">
            <!-- FOR ANSWER -->
            <div class="row" v-for="(answer, index) in answers_value" :key="index">
              <hr />
              <h5 class="center">{{ answer.title }}</h5>

              <div class="col s2 m2 l2">
                <div class="row">
                  <span @click="upvotes_answer(answer.author, answer._id)">
                    <i class="material-icons">thumb_up</i>
                  </span>
                </div>
                <div class="row">
                  <!-- {{question_detail.upvotes}} -->
                  <h5>{{ answer.upvotes - answer.downvotes }}</h5>
                </div>
                <div class="row">
                  <span @click="downvotes_answer(answer.author, answer._id)">
                    <i class="material-icons">thumb_down</i>
                  </span>
                </div>
              </div>
              <div class="col m10 l10 s10">
                <p v-html="answer.description"></p>
              </div>

              <!-- {{answer.author }}  {{ id_login }} -->
              <div v-if="answer.author == id_login" class="row">
                <!-- <div class="">   -->
                <div class="container">
                  <div class="card-action col">
                    <a
                      @click="edit_answer_button(answer._id)"
                      class="waves-effect waves-light orange lighten-2 btn"
                    >
                      <i class="material-icons left">edit</i>EDIT
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class> -->
            <!-- <span class="relativetime">answer: {{ getDate(answer.createdAt) }}</span> -->
            <!-- </div> -->
            <!-- <DetailCard></DetailCard> -->
            <div class="center">
              <!-- <AuthorCard
                :answer="answer"
              ></AuthorCard>-->
            </div>
          </div>
        </div>
        <hr />
        <!-- YOUR ANSWER -->
        <div class="col m11 l11 s11 offset-s1 offset-m1 offset-l1">
          <div class="col 11">
            <span>Your Answer</span>
            <hr />
          </div>
        </div>
        <div class="col m12 l12 s12">
          <AnswerForm @AnswerForm_trigger="AnswerForm_trigger"></AnswerForm>
        </div>
      </div>
    </div>
    <!-- MENU RIGHT BAR -->
    <div class="col m3 l3 s12">
      <!-- WATCH TAG -->
      <WatchTagCard></WatchTagCard>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import myServer from "../api/myServer.js";
import NavBar from "@/components/NavBar";
import MenuLeftBar from "@/components/MenuLeftBar";
import SearchForm from "@/components/SearchForm";
import WatchTagCard from "@/components/WatchTagCard";
// import DetailQuestionCard from "@/components/DetailQuestionCard";
import DetailCard from "@/components/DetailCard";
import AnswerForm from "@/components/AnswerForm";
import AuthorCard from "@/components/AuthorCard";
import TagCard from "@/components/TagCard";
import { mapState } from "vuex";

export default {
  data() {
    return {
      question_detail: "",
      upvotes_value: [],
      downvotes_value: [],
      answers_value: [],
      question_detail_name: "",
      id_login: localStorage.getItem("id")
    };
  },
  components: {
    NavBar,
    MenuLeftBar,
    SearchForm,
    WatchTagCard,
    // DetailQuestionCard,
    DetailCard,
    AnswerForm,
    AuthorCard,
    TagCard
  },
  methods: {
    edit_answer_button(id) {
      console.log(id, " edit answer");
      Swal.fire({
        position: "center",
        type: "success",
        title: `Edit blum kehandle`,
        showConfirmButton: false,
        timer: 1500
      });
    },
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString();
      return dateString;
    },
    downvotes_answer(idVoter, answerId) {
      console.log("downvotes_answer", idVoter, answerId);
      // myServer
      //   .patch(
      //     `/answers/downvotes/${answerId}`,
      //     { authorId: idVoter },
      //     {
      //       headers: {
      //         token: localStorage.getItem("token")
      //       }
      //     }
      //   )
      //   .then(({ data }) => {
      //     console.log(data);
      //     // this.$store.commit("UPDATE_AFTER_UPVOTE", data);
      //     // this.$store.dispatch("FETCH_DATA_QUESTION");
      //   })
      //   .catch(err => {
      //     console.log(err.response);
      //     Swal.fire({
      //       type: "error",
      //       title: "Oops...",
      //       text: `${err.response.data.message}`
      //     });
      //   });
    },
    upvotes_answer(idVoter, answerId) {
      console.log("upvotes_answer", idVoter, answerId);
      // myServer
      //   .patch(
      //     `/answers/upvotes/${answerId}`,
      //     { authorId: idVoter },
      //     {
      //       headers: {
      //         token: localStorage.getItem("token")
      //       }
      //     }
      //   )
      //   .then(({ data }) => {
      //     console.log(data);
      //     // this.question_detail = data;
      //     // this.upvotes_value = data.upvotes;
      //     // this.downvotes_value = data.downvotes;
      //     // this.answers_value = data.answers;
      //     this.$store.commit("UPDATE_AFTER_UPVOTE", data);
      //     // this.$store.dispatch("FETCH_DATA_QUESTION");
      //   })
      //   .catch(err => {
      //     console.log(err.response);
      //     Swal.fire({
      //       type: "error",
      //       title: "Oops...",
      //       text: `${err.response.data.message}`
      //     });
      //   });
    },
    AnswerForm_trigger(payload) {
      console.log("AnswerForm_trigger", payload);
      myServer
        .post(
          `/answers`,
          {
            title: payload.answer,
            description: payload.description,
            questionId: this.$route.params.id
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log(data, "answer success");
          // this.$store.commit("UPDATE_AFTER_CREATE_ANSWER", { data:data , id: this.$route.params.id });

          return myServer
            .put(
              `/questions/answers/${this.$route.params.id}`,
              {
                answers: data
              },
              {
                headers: {
                  token: localStorage.getItem("token")
                }
              }
            )
            .then(({ data }) => {
              console.log(data, "update answer success");
              this.fetchDataQuestion();

              this.$store.commit("UPDATE_AFTER_ANSWER", data);
            });
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
    },
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString();
      return dateString;
    },
    upvotes_question(id) {
      // console.log(localStorage.getItem("token"));
      myServer
        .patch(
          `/questions/upvotes/${this.$route.params.id}`,
          { authorId: id },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.question_detail = data;
          this.upvotes_value = data.upvotes;
          this.downvotes_value = data.downvotes;
          this.answers_value = data.answers;
          this.$store.commit("UPDATE_AFTER_UPVOTE", data);
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
    },
    fetchDataQuestion() {
      myServer
        .get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          this.question_detail = data;
          this.question_detail_name = data.author.name;
          this.upvotes_value = data.upvotes;
          this.downvotes_value = data.downvotes;
          this.answers_value = data.answers;

          // commit('INSERT_FETCH_QUESTION', data)
          // commit("USER_LOGIN_MUTATION");
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
    },
    downvotes_question(id) {
      console.log("downvotes_question parent", id);
      myServer
        .patch(
          `/questions/downvotes/${this.$route.params.id}`,
          { authorId: id },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.question_detail = data;
          this.upvotes_value = data.upvotes;
          this.downvotes_value = data.downvotes;
          this.answers_value = data.answers;
         this.$store.commit("UPDATE_AFTER_UPVOTE", data);
          // this.$store.commit("UPDATE_AFTER_UPVOTE_ANSWER", data);
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  created() {
    console.log(" ini created");
    if (this.isLogin) {
      console.log(" masuk isLogin");
      this.fetchDataQuestion();
      console.log("created");
      console.log(this.$route.params.id);
    } else {
      console.log(" masuk else");
      this.$router.push("/login");
    }
    // this.$store.dispatch('FETCH_DETAIL_QUESTION', this.$route.params.id)
    // FETCH_DETAIL_QUESTION ({ state, commit }, payload)
  }
};
</script>

<style>
</style>
