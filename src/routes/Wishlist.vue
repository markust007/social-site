<template>
  <section id="wishlist">
    <div class="list-items" v-show="!showList">
      <h3 class="title">Lists</h3>
      <ul>
        <li v-for="(item, index) in wishlist" @click="select(item)">
          <p class="wish-for">{{item.for}}</p>
          <p class="created-by">Created by: {{item.created}}</p>
          <p class="created-date">on: {{item.date}}</p>
        </li>
      </ul>
    </div>

    <!-- <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
    > -->
      <div class="wishlist" v-show="!editList && showList">
        <div class="top">
          <button class="edit" @click="backtoLists"><v-icon>arrow_back</v-icon></button>
          <div v-show="mainItems.created == name" class="edit-trash">
            <button class="edit" @click="editThisList"><v-icon>edit</v-icon></button>
            <button class="edit" @click="deleteList"><v-icon>delete</v-icon></button>
          </div>
          <p class="title">{{mainItems.for}}</p>
        </div>
        <ul>
          <li v-for="(item, index) in mainItems.items" @click="strike(index)">
            <div class="make-strike" :class="{strike: got[index]}"><v-icon class="animated flipInY" v-show="got[index]">check</v-icon></div>
            <p :class="{strike: got[index]}">{{item.item}}</p>
          </li>
        </ul>
      </div>
    <!-- </transition> -->

    <button class="new-list" :class="{close: newList}"@click="createList" v-show="!editList && !showList"><v-icon>add</v-icon></button>

    <!-- WISHLIST NEW-->
    <!-- <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    > -->
      <div class="wishlist new" v-show="newList && !editList && !showList">
        <p>Title:</p>
        <input type="text" v-model="newItems.for" class="title" />
        <ul>
          <li v-for="(item, index) in items">
            <input type="text" v-model="items[index].item" />
          </li>
        </ul>
        <div class="buttons">
          <button @click="addItem" class="edit"><v-icon>add</v-icon></button>
          <button class="edit" @click="pushList"><v-icon>save</v-icon></button>
        </div>
      </div>
    <!-- </transition> -->

    <!-- WISHLIST EDIT -->
    <!-- <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
    > -->
      <div class="wishlist editlist" v-if="editList">
        <p>Title:</p>
        <input type="text" v-model="editItems.for" class="title" />
        <ul>
          <li v-for="(item, index) in editItems.items">
            <input type="text" v-model="editItems.items[index].item" />
          </li>
        </ul>
        <div class="buttons">
          <button @click="editItemsAdd" class="edit"><v-icon>add</v-icon></button>
          <button class="edit" @click="saveEditList"><v-icon>save</v-icon></button>
        </div>
      </div>
    <!-- </transition> -->

    <!-- MODAL -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="modal" v-show="modal">
        <div class="modal-window">
          <p>Are you sure?</p>
          <button class="modal-btn" @click="yesModal">YES</button>
          <button class="modal-btn" @click="noModal">NO</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { config, app, users, comments, wishlist, fs, timestamp } from '../util/config'
export default {
  name: 'Wishlist',
  data() {
    return {
      sign: true,
      listFor: "",
      newList: false,
      editList: false,
      showList: false,
      modal: false,
      items: [{"item": "Edit Item", "got": false}],
      newItems: {
        created: "",
        for: "",
        date: "",
        items: [{"item": "Edit Item", "got": false}]
      },
      editItems: [{}],
      mainItems: [{}],
      got: [],
      key: null
    };
  },

  computed: {
    name () {
      return this.$store.state.name
    },
    date() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const d = new Date();
      // const month = monthNames[d.getMonth()];
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const year = d.getFullYear();
      const hours = d.getHours();
      let hour;
      let postfix;
      if (hours > 12) {
        hour = hours - 12
        postfix = "p.m."
      } else {
        hour = hours
        postfix = "a.m."
      }
      // hours > 12 ? hour = hours - 12 : hour = hours
      const min = d.getMinutes();
      const fulldate = month + "/" + day + "/" + year + " at " + hour + ":" + min + " " + postfix;
      return fulldate
    }
  },

  methods: {
    saveEdit() {
      // let wishRef = wishlist.child();
      // wishlist.on('child_changed', function(data) {
      //   setCommentValues(element, data.key, data.val().text, data.val().author);
      // });
      // var timestamp = (new Date()).getTime();
      // usersRef.update({
      //  '/someUserKey/lastLogin': timestamp,
      //  '/adminLogs/logins/anotherUserKey/lastLogin': timestamp
      // })
      // .catch(function (err) {
      //  console.log(‘one of these updates failed’, err);
      // });
    },
    gone(num) {
      wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").on('value').then((snapshot) => {
        let value = snapshot.val();
        if(value == true || value == "true") {
          return true
        } else {
        return false
        }
      });
    },
    backtoLists() {
      this.showList = false
      this.mainItems = [{}]
    },
    select(num) {
      this.got = []
      const VALUES = Object.values(num)
      VALUES.forEach((val) => {
        this.key = val; //GOT the key here
      });
      wishlist.child("" + this.key + "").once('value').then((snapshot) => {
        console.log(snapshot.val());
        this.mainItems = snapshot.val();
        console.log(snapshot.child("items").val())
        let items = snapshot.child("items").val()
        for (let i = 0; i < items.length; i++) {
            // console.log(snapshot.child("items").child(i).child("got").val())
            this.got.push(snapshot.child("items").child(i).child("got").val())
        }
        snapshot.forEach((snap) => {
          console.log(snap.val())
          console.log(snap.child("got").val())
        });
      });
      this.showList = true
    },
    deleteList(num) {
      // wishlist.on('child_removed', function(data) {
      //   deleteComment(postElement, data.key);
      // });
      // const VALUES = Object.values(num)
      // VALUES.forEach((val) => {
      //   this.key = val; //GOT the key here
      // })
      this.modal = true
    },
    strike(num) {
      // const VALUES = Object.values(num)
      // VALUES.forEach((val) => {
      //   this.key = val; //GOT the key here
      // })
      // event.target.previousElementSibling.classList.toggle("strike");
      wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").once('value').then((snapshot) => {
        let value = snapshot.val();
        if(value == true || value == "true") {
          wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").set(false);
        } else {
          wishlist.child("" + this.key + "").child("items").child("" + num + "").child("got").set(true);
        }
        this.got[num] = !snapshot.val();
      });
      this.$forceUpdate();
    },
    yesModal() {
      wishlist.child("" + this.key + "").remove();
      this.modal = false
      this.showList = false
      this.mainItems = [{}]
    },
    noModal() {
      this.modal = false
    },
    addItem() {
      this.items.push({"item": "", "got": false});
      this.$forceUpdate();
    },
    editItemsAdd() {
      this.editItems.items.push({"item": "", "got": false})
      // this.editItemsGifts.push("New Item");
      this.got.push(false);
      this.$forceUpdate();
    },
    saveEditList() {
      wishlist.child(this.key).set(this.editItems);
      this.mainItems = this.editItems
      this.editList = false
    },
    createList() {
      if(this.newList) {
        this.closeNewList();
      } else {
        this.newList = true
        this.newItems.created = this.name
        this.newItems.date = this.date
      }
    },
    closeNewList() {
      this.newList = false
      this.items = [{"item": "Edit Item", "got": false}],
      this.newItems = {
        created: "",
        for: "",
        date: "",
        items: [{"item": "Edit Item", "got": false}]
      }
    },
    pushList() {
      // let pushList = wishlist.push({
      //   created: this.name,
      //   for: "",
      //   items: []
      // });
      let pushList = wishlist.push(this.newItems);
      this.key = pushList.key
      wishlist.child(this.key).child("items").set(this.items);
      this.newList = false
      this.newItems = {
        created: "",
        for: "",
        date: "",
        items: [{"item": "Edit Item", "got": false}]
      }
      this.items = [{"item": "Edit Item", "got": false}]
      return pushList
    },
    // editList() {
    //   // let stuff = JSON.stringify(this.newItems)
    //   // this.items.push(stuff);
    //   this.items = [];
    //   this.items = this.items.concat(this.newItems);
    // },
    editThisList(num) {
      this.editList = true
      // const VALUES = Object.values(num)
      // VALUES.forEach((val) => {
      //   this.key = val; //GOT the key here
      // })
      wishlist.child("" + this.key + "").once('value').then((snapshot) => {
        console.log(snapshot.val());
        this.editItems = snapshot.val();
      })
      // console.log(this.key)
      // wishlist.once("value", function (snap) {
      //  console.log(snap.key) //logs wishlist
      // });
      // wishlist.once('value').then((snapshot) => {
      //   console.log(snapshot.key) //logs wishlist
      //   snapshot.forEach((childSnap) => {
      //     console.log('user', childSnap.key, childSnap.val());
      //     const FINAL = childSnap.key
      //     if(FINAL == this.key) {
      //       let theKey = FINAL //GOT the key here
      //       // this.key = theKey
      //       console.log(theKey)
      //     } else {
      //       console.log('false')
      //     }
      //    });
      //   // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      //   // ...
      // });
    },
    saveList() {
      // let key = this.key
      // let stuff = JSON.stringify(this.items)
      wishlist.child(this.key).child("items").set(this.items);
      // wishlist.update({
      //  "/key": this.items
      //  // "/adminLogs/logins/anotherUserKey/lastLogin": timestamp
      // })
    }
  },
  mounted() {
    setTimeout(() => {

    }, 500);
  },
  components: {},
  props: ['wishlist']
};
</script>

<style scoped lang="scss">
#wishlist {
  text-align: left;
}
.list-items {
  background: #fff;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  h3 {
    background: rgba(0,0,0,0.08);
    padding: 10px;
    font-size: 1.25rem;
    margin: 0;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      padding: 10px;
      border-top: 1px solid #ccc;
      cursor: pointer;
      p {
        margin: 0;
        &.wish-for {
          color: #00BCD4;
          font-weight: 700;
          font-size: 1.2rem;
        }
        &.created-by {
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
        }
        &.created-date {
          font-size: 0.9rem;
          color: #999;
        }
      }
      &.created-by {

      }
      &.created-date {

      }
    }
  }
}
.edit {
  padding: 5px;
  border-radius: 50%;
  background: #00BCD4;
  color: #fff;
  font-size: 1rem;
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
.save {
  background: #ccc;
  padding: 5px;
  border-radius: 2px;
}
.new-list {
  padding: 5px;
  border-radius: 50%;
  background: #00BCD4;
  color: #fff;
  font-size: 1.8rem;
  width: 45px;
  height: 45px;
  margin-right: 5px;
  margin: 10px auto 0;
  display: block;
  z-index: 99;
  &.close {
    color: #fff;
    background: red;
    transform: rotate(45deg);
  }
}
.add-item {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 2px;
  &.disabled {
    cursor: default;
    pointer-events: none;
    color: #ccc;
  }
}
.wishlist {
  background: white;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  .top {
    background: rgba(0,0,0,0.08);
    padding: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    .edit-trash {
      display: inline-block;
    }
    .title {
      margin: 5px 0;
      color: #00BCD4;
      font-weight: 700;
      font-size: 1.5rem;
    }
  }
  ul {
    list-style-type: none;
    padding: 10px;
    margin: 0;
    li {
      border-bottom: 1px solid #ccc;
      padding: 10px 5px;
      cursor: pointer;
      &:last-child {
        border-bottom: 0px solid #ccc;
        margin-bottom: 5px;
      }
      .make-strike {
        float: left;
        font-size: 0.8rem;
        background: #fff;
        border: 1px solid #ccc;
        width: 10px;
        height: 10px;
        color: #fff;
        padding: 3px;
        border-radius: 50%;
        text-transform: uppercase;
        text-align: center;
        &.strike {
          background: #00BCD4;
          border: 1px solid #00BCD4;
        }
      }
      p {
        display: inline-block;
        margin: 0;
        vertical-align: middle;
        padding-left: 8px;
        transition: all .3s;
        &.strike {
          text-decoration: line-through;
          color: #ccc;
        }
      }
    }
  }
  &.new {
    margin-top: -18px;
  }
  &.new, &.editlist {
    p {
      margin: 0;
      padding: 10px 10px 4px 10px;
      text-transform: uppercase;
      color: #666;
    }
    .title {
      display: block;
      color: #00BCD4;
      font-weight: 600;
      font-size: 1.5rem;
      border-bottom: 1px solid #00BCD4;
    }
    input {
      display: block;
      background-color: #eeeeee;
      width: calc(100% - 20px);
      padding: 8px 10px;
      color: #444;
    }
    ul {
      padding: 10px 10px 0;
    }
    .buttons {
      padding: 0 15px 10px;
    }
  }
}
.modal {
  position: absolute;
  background: transparentize(#eeeeee, 0.4);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-window {
    background: #fff;
    width: 350px;
    height: 200px;
    display: block;
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16),0px 2px 5px 0px rgba(0, 0, 0, 0.26);
    p {
      margin: 0;
      padding-top: 12%;
      text-align: center;
      font-size: 2rem;
      color: #666;
    }
    button {
      padding: 10px 20px;
      border-radius: 5px;
      background: #00BCD4;
      color: #fff;
      text-transform: uppercase;
      display: inline-block;
      margin: 20px 8px;
      font-size: 1.25rem;
      width: 75px;
    }
  }
}
</style>
