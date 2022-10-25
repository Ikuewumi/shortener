<script setup lang="ts">
import { $ref } from 'vue/macros';
import { DbUrlModel } from 'shortener'

/**Error Mesage Logic */
let errMsg = $ref('')
const showErr = (msg: string) => {
   errMsg = msg.trim()
   setTimeout(() => errMsg = '', 2000)
}

const link = $ref(null as unknown as HTMLInputElement)
const a = $ref(null as unknown as HTMLAnchorElement)

let processedLink = $ref({} as unknown as DbUrlModel)


const shortenLink = async (url: string) => {
   try {
      if (url.trim() === '') throw Error('please put in a valid url')

      processedLink = {} as unknown as DbUrlModel

      const response = await fetch('/shorten', {
         method: 'POST',
         headers: {
            "Content-type": 'application/json'
         },
         body: JSON.stringify({
            longUrl: url.trim()
         })
      })

      if (!response.ok) throw Error(await response.json())

      const data: DbUrlModel = await response.json()
      processedLink = data

   }
   catch (err: any) { showErr(err?.msg as string ?? String(err)) }
}

const copyLink = async () => {
   try {
      const p = await navigator.permissions.query({ name: 'clipboard-write' } as any)
      if (p.state === 'granted') {
         await (navigator.clipboard).writeText(a.href)
         showErr('copied! ✅')
      } else {
         throw Error('cannot use the clipboard')
      }
   }
   catch (err) { showErr(String(err)) }
}


</script>

<template>
   <div class="card pbl-5 pb-10 g-2 dis-grid">
      <h1 class="f-slab">SnipUrl</h1>
      <p class="f-poppins">Shorten your links with ease!</p>
      <div class="field dis-flex mt-5">
         <input ref="link" type="text" class="f-poppins pin-2 pbl-2" placeholder="Enter your link">
         <span class="btn" @click="shortenLink(link.value)">✂</span>
      </div>

      <div class="hollow result bg-gray" v-if="!processedLink?.shortUrl"></div>
      <div class="result link field dis-flex" v-else>
         <a ref="a" _target="blank" referrerpolicy="no-referrer" class="pbl-3" :href="processedLink.shortUrl">{{
         processedLink.shortUrl }}</a>
         <span class="btn" @click="copyLink">📋</span>
      </div>

      <span class="mt-3 text-align-c case-u">
         <a _target="blank" referrerpolicy="origin" href="https://github.com/Ikuewumi/shortener"
            class="f-mono c-dark">Github</a>
      </span>
   </div>


   <div class="toast f-poppins" :class="errMsg > '' ? 'active' : ''">
      {{ errMsg ?? '' }}
   </div>
</template>

<style lang="scss">
.toast {
   position: fixed;
   inset: 0 auto auto 50%;
   transform: translateX(-50%) translateY(-100%);


   background: #333;
   width: min(calc(400px - 1.6rem), 90vw);
   padding: 1.2rem 0.8rem;
   border-radius: 0.4vmax;
   color: #eee;
   // border-top: 2px solid var(--clr-red);
   font-size: 0.85rem;
   transition: 0.3s ease;
   will-change: auto;

   &.active {
      transform: translateX(-50%) translateY(20px);
   }
}

.card {
   --column-count: 3;
   --br: 0.4vmax;
   width: min(400px, 90vw);
   background: #fff;
   border-radius: var(--br);


   grid-template-columns: minmax(0.5rem, 1fr) minmax(0, 40ch) minmax(0.5rem, 1fr);

   &>* {
      grid-column: 2 / -2;
   }

   input {
      outline: none;
      border: 0.5px solid rgba(0 0 0 / 0.1);
      // border-radius: var(--br);
      min-width: 0;
      width: 100%;
   }

   .field {
      width: 100%;
      height: min-content;

      span.btn {
         padding-inline: 0.7rem;
         background: var(--clr-blue);
         display: grid;
         place-items: center;
         cursor: pointer;
      }
   }

   .hollow {
      height: 40px;
      width: 100%;
      opacity: 0.2;
   }

   .result {
      margin-top: var(--size-9);

      a {
         width: 100%;
         padding-inline-start: var(--size-2);
         font-size: 0.85rem;
      }

      &.link {
         background: none;
         border: 0.5px solid rgba(0 0 0 / 0.1);
         width: fit-content;
         max-width: 100%;
         gap: var(--size-3);

         span.btn {
            border-radius: 0;
         }
      }

   }
}
</style>
