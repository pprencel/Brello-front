import { writable } from 'svelte/store';
import API from '../utils/api';
import constants from '../constants/constants.json'

let init = {
  card: {
      id: 1,
      name: 'This is card name',
      description: 'and this is card description bla bla bla, bla bla',
      listName: 'nie fajna',
      attachment: null,
      comments: [
        {
          username: "Jan Oblak",
          date: "2019-11-27 22:03:01",
          body: "cze tu przemko"
        },
        {
          username: "Roger Oblak",
          date: "2019-11-25 22:03:01",
          body: "hallo janko"
        },
      ]
      // attachment: 'https://i.redd.it/3yps4sdvzfm21.png'
  },
  visible: false
}

function createCardStore() {
    const { subscribe, set, update } = writable(init);

    return {
      subscribe,
      openCard: async (cardId) => {
        const res = await API(`cards/${cardId}/?format=json`)
        if(res.data.attachmentUrlCard !== "null")
          res.data.attachmentUrlCard = `${res.data.attachmentUrlCard}${constants.ATTACHMENT_TOKEN}`
        else
          res.data.attachmentUrlCard = null

        update(v => {
          v.card = res.data
          v.visible = true
          if(v.card.attachmentUrlCard) {
            let regex = /\/([a-zA-Z0-9_ -.]*)\?/gi;
            let fileName = regex.exec(v.card.attachmentUrlCard)[0].slice(1, -1)
            v.card.attachmentFileName = fileName.substr(fileName.lastIndexOf('/')+1)
            v.card.attachmentFileFormat = fileName.split('.').pop().toUpperCase()
          }

          console.log(v.card.attachmentFileName);
          return v
        })
      },
      addCard: async (newCardName) => {
        console.log('API call', newCardName);
        // update(v => {
        //   v.visible = true
        //   v.card = init.card
        //   return v
        // })
      },
      hideModal: async () => {
        // should be - PATCH this card
        const cardId = 1
        const res = await API(`cards/${cardId}/?format=json`)

        update(v => {
          v.visible = false
          return v
        })
      },
      uploadAttachment: async (file, cardId) => {
        const formData = new FormData();
        formData.append("image", file);
        // formData.pipe(async data => {
        //   res = await API.put(`card_attachment_add/${cardId}/`, data)
        //   console.log(r.data)
        // })
        const res = await API.put(`card_attachment_add/${cardId}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res);
        console.log('111111');
        // update(v => {
        //   v.card.attachment = 'https://i.redd.it/3yps4sdvzfm21.png'
        //   return v
        // })
      },
      removeAttachment: async (cardId) => {
        const res = await API.put(`card_attachment_delete/${cardId}/`)

        update(v => {
          v.card.attachment = null
          return v
        })
      },
      saveComment: async (cardId, commentBody) => {
        const res = await API.post(`comments/?format=json`, {
          body: commentBody,
          idCard: cardId,
          idUser: 1
        })

        update(v => {
          // v.card.comments.push({
          //   username: "janok Oblak",
          //   date: "2019-12-25 22:03:01",
          //   body: commentBody
          // })
          v.visible = true
          return v
        })
        return res.data
      },
      saveCommentAttachment: async (file, commentId) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await API.put(`comment_attachment_add/${commentId}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        // const res = await API.post(`cards//?format=json`, {
        //   file: formData
        // })

        // update(v => {
        //   v.card.attachment = 'https://i.redd.it/3yps4sdvzfm21.png'
        //   return v
        // })
      },

      reset: () => set({})
    };
}

export const cardStore = createCardStore();
