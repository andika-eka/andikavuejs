import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export default function usePackages() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${ getCookie("user")}` 
    const paket = ref([])
    const packages = ref([])

    const errors = ref('')
    const router = useRouter()
    const parseCookie = str =>  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});

    const getPackages = async () => {
        let response = await axios.get('/api/packages')
        packages.value = response.data.data
    }

    const getPackage = async (id_pk) => {
        let response = await axios.get(`/api/packages/${id_pk}`)
        paket.value = response.data.data
    }

    const destroyPackage = async (id_pk) => {
        await axios.delete(`/api/packages/${id_pk}`)
    }


    const storePackage = async (data) => {
        errors.value = ''
        try {
            
            let response = await axios.get('/api/user');
            let user_id = response.data.id
            data.id_user = user_id;
            console.log(data);
            await axios.post('/api/packages', data)
            await router.push({ name: 'packages.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const updatePackage = async (id_pk) => {
        errors.value = ''
        try {
            await axios.patch(`/api/packages/${id_pk}`, packages.value)
            await router.push({ name: 'packages.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    return {
        errors,
        paket,
        packages,
        getPackage,
        getPackages,
        storePackage,
        destroyPackage,
        updatePackage
    }
}