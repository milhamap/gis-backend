const knex = require('../../databases')
const { uploadImageSchool, uploadImageLogo, deleteImageLogo, deleteImageSchool } = require('../../utils/storages')

module.exports = {
    createSchoolPlace: async (req, res) => {
        const { name, address, accreditation, since, curriculum, latitude, longitude, major, marker_id, name_headmaster, count_class, count_student, description } = req.body
        try {
            const imageLogo = uploadImageLogo(req.files.logo[0].path, req.files.logo[0].filename + '-' + req.files.logo[0].originalname)
            const urlImageLogo = imageLogo.url + req.files.logo[0].filename + '-' + req.files.logo[0].originalname + '?alt=media' + '&token=' + imageLogo.token;
            const imageSchool = uploadImageSchool(req.files.image[0].path, req.files.image[0].filename + '-' + req.files.image[0].originalname)
            const urlImageSchool = imageSchool.url + req.files.image[0].filename + '-' + req.files.image[0].originalname + '?alt=media' + '&token=' + imageSchool.token;
            const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            const school = await knex('list_schools').insert({ 
                name,
                slug,
                address,
                accreditation,
                since,
                curriculum,
                latitude,
                longitude,
                logo: urlImageLogo,
                image: urlImageSchool
            }).returning('id')
            major.map(async (item) => {
                await knex('major_schools').insert({
                    school_id: school[0].id,
                    major_id: item
                })
            })
            await knex('detail_schools').insert({
                school_id: school[0].id,
                name_headmaster,
                count_class,
                count_student,
                description
            })
            await knex('marker_schools').insert({
                school_id: school[0].id,
                marker_id
            })
            return res.status(200).json({
                message: 'Create School Place Success',
                school
            })
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            })
        }
    },
    getsSchoolPlace: async (req, res) => {
        const name = req.query.name
        try {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            const list = knex('list_schools')
            !name ? list : list.where('name', 'like', `%${name}%`)
            const list_schools = await list
            if (list_schools.length === 0) return res.status(400).json({ message: 'School is Empty' })
            const features = await Promise.all(
                list_schools.map(async (item) => {
                    const detail_schools = await knex('detail_schools').where({ school_id: item.id }).first();
                    const marker_schools = await knex('marker_schools').where({ school_id: item.id }).first();
                    const marker = await knex('markers').where({ id: marker_schools.marker_id }).first();
                    const major_schools = await knex('major_schools').where({ school_id: item.id });
            
                    let major = [];
                    if (major_schools.length > 0) {
                        major = await knex('majors').whereIn('id', major_schools.map((item) => item.major_id));
                    }
            
                    return {
                        type: 'Feature',
                        slug: item.slug,
                        properties: {
                            id: item.id,
                            nama_sekolah: item.name,
                            alamat: item.address,
                            akreditasi: item.accreditation,
                            tahun_didirikan: item.since,
                            kurikulum: item.curriculum,
                            kepala_sekolah: detail_schools.name_headmaster,
                            jumlah_kelas: detail_schools.count_class,
                            jurusan: major.map((item) => item.name),
                            jumlah_siswa: detail_schools.count_student,
                            marker: marker.name,
                            deskripsi: detail_schools.description,
                            logo: item.logo,
                            image: item.image,
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [item.longitude, item.latitude],
                        },
                    };
                })
            );
            return res.status(200).json({
                type: "FeatureCollection",
                features
            })
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            })
        }
    },
    getSchoolPlace: async (req, res) => {
        try {
            const { slug } = req.params
            const list_schools = await knex('list_schools').where({ slug }).first()
            if (!list_schools) return res.status(400).json({ message: 'School Not Found' })
            const detail_schools = await knex('detail_schools').where({ school_id: list_schools.id }).first()
            const marker_schools = await knex('marker_schools').where({ school_id: list_schools.id }).first()
            const marker = await knex('markers').where({ id: marker_schools.marker_id }).first()
            const major_schools = await knex('major_schools').where({ school_id: list_schools.id })
            let major = []
            if (major_schools.length > 0) {
                major = await knex('majors').whereIn('id', major_schools.map(item => item.major_id))
            }
            return res.status(200).json({
                id: list_schools.id,
                nama_sekolah: list_schools.name,
                alamat: list_schools.address,
                akreditasi: list_schools.accreditation,
                tahun_didirikan: list_schools.since,
                kurikulum: list_schools.curriculum,
                kepala_sekolah: detail_schools.name_headmaster,
                jumlah_kelas: detail_schools.count_class,
                jurusan: major.map(item => item.name),
                jumlah_siswa: detail_schools.count_student,
                marker: marker.name,
                deskripsi: detail_schools.description,
                logo: list_schools.logo,
                image: list_schools.image
            })
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            })
        }
    },
    updateSchoolPlace: async (req, res) => {
        const { name, address, accreditation, since, curriculum, latitude, longitude, major, marker_id, name_headmaster, count_class, count_student, description } = req.body
        const { slug } = req.params
        try {
            const list_schools = await knex('list_schools').where({ slug }).first()
            console.log(list_schools)
            if (!list_schools) return res.status(400).json({ message: 'School Not Found' })
            let urlImageLogo = list_schools.logo
            let urlImageSchool = list_schools.image
            if (req.files) {
                if (req.files.logo) {
                    let textLogo = list_schools.logo.split('https://firebasestorage.googleapis.com/v0/b/project-gis-2192c.appspot.com/o/logo%2F')
                    textLogo = textLogo[1].split('?alt=media&token=')
                    const filenameLogo = textLogo[0]
                    deleteImageLogo(filenameLogo)
                    const imageLogo = uploadImageLogo(req.files.logo[0].path, req.files.logo[0].filename + '-' + req.files.logo[0].originalname)
                    urlImageLogo = imageLogo.url + req.files.logo[0].filename + '-' + req.files.logo[0].originalname + '?alt=media' + '&token=' + imageLogo.token;
                }
                if (req.files.image) {
                    let textSchool = list_schools.image.split('https://firebasestorage.googleapis.com/v0/b/project-gis-2192c.appspot.com/o/school%2F')
                    textSchool = textSchool[1].split('?alt=media&token=')
                    const filenameSchool = textSchool[0]
                    deleteImageSchool(filenameSchool)
                    const imageSchool = uploadImageSchool(req.files.image[0].path, req.files.image[0].filename + '-' + req.files.image[0].originalname)
                    urlImageSchool = imageSchool.url + req.files.image[0].filename + '-' + req.files.image[0].originalname + '?alt=media' + '&token=' + imageSchool.token;
                }
            }
            const slug_school = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            await knex('list_schools').where({ slug }).update({
                slug: slug_school,
                name,
                address,
                accreditation,
                since,
                curriculum,
                latitude,
                longitude,
                logo: urlImageLogo,
                image: urlImageSchool
            })
            await knex('major_schools').where({ school_id: list_schools.id }).del()
            major.map(async (item) => {
                await knex('major_schools').insert({
                    school_id: list_schools.id,
                    major_id: item
                })
            })
            await knex('detail_schools').where({ school_id: list_schools.id }).update({
                name_headmaster,
                count_class,
                count_student,
                description
            })
            await knex('marker_schools').where({ school_id: list_schools.id }).update({
                marker_id
            })
            return res.status(200).json({
                message: 'Update School Place Success'
            })
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            })
        }
    },
    deleteSchoolPlace: async (req, res) => {
        const { slug } = req.params
        try {
            const list_schools = await knex('list_schools').where({ slug }).first()
            if (!list_schools) return res.status(400).json({ message: 'School Not Found' })
            let textLogo = list_schools.logo.split('https://firebasestorage.googleapis.com/v0/b/project-gis-2192c.appspot.com/o/logo%2F')
            textLogo = textLogo[1].split('?alt=media&token=')
            const filenameLogo = textLogo[0]
            let textSchool = list_schools.image.split('https://firebasestorage.googleapis.com/v0/b/project-gis-2192c.appspot.com/o/school%2F')
            textSchool = textSchool[1].split('?alt=media&token=')
            const filenameSchool = textSchool[0]
            deleteImageLogo(filenameLogo)
            deleteImageSchool(filenameSchool)
            await knex('detail_schools').where({ school_id: list_schools.id }).del()
            await knex('major_schools').where({ school_id: list_schools.id }).del()
            await knex('marker_schools').where({ school_id: list_schools.id }).del()
            await knex('list_schools').where({ slug }).del()
            return res.status(200).json({
                message: 'Delete School Place Success'
            })
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            })
        }
    }
}