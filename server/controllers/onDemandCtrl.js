const { getCurrentPool } = require("../utils/getCurrentPool");

const onDemandCtrl = {
  getOnDemandList: async (req, res) => {
    const currentPool = getCurrentPool("common");
    const { page, itemPerPage } = req.query;
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      // 현재 페이지에 맞는 결과
      const sql = `
      SELECT * FROM on_demand LIMIT ${(page - 1) * itemPerPage}, ${itemPerPage};
      `;
      const row = await connection.query(sql);
      // 총 item 개수
      const sql2 = `
      SELECT COUNT(*) as count FROM on_demand;
      `;
      const row2 = await connection.query(sql2);

      res.status(200).json({
        result: row[0].map((video) => {
          if (video.application) {
            return { ...video, application: video.application.split(",") };
          }
          return video;
        }),
        totalCount: row2[0][0].count,
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  getOnDemandAllFilter : async(req,res) => {
    const currentPool = getCurrentPool("common"); 
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      // 전체 필터 리스트
      const sql = `
      select group_concat(distinct year) as yearFilter, 
      group_concat(distinct region) as regionFilter,
      group_concat(distinct language) as languageFilter,
      group_concat(distinct application) as applicationFilter
      from on_demand
      where not (year is NULL and region is NULL and language is NULL and application is NULL)
      `;
      const row = await connection.query(sql)
      connection.release();
      res.status(200).json({
        result: row[0],
        year : row[0][0].yearFilter.split(","),
        region : row[0][0].regionFilter.split(","),
        language : row[0][0].languageFilter.split(","),
        application : [...new Set (row[0][0].applicationFilter.split(","))] ,
        success: true,
      });
    }catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  getOnDemandVideo: async (req, res) => {
    const { id } = req.params;
    const currentPool = getCurrentPool("common");
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM on_demand WHERE id=${id};
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  editOnDemandList: async (req, res) => {
    const currentPool = getCurrentPool("common");
    const connection = await currentPool.getConnection(async (conn) => conn);
    const {
      id,
      title,
      speaker,
      affiliation,
      abstractDesc,
      region,
      year,
      language,
      thumbnail,
      video,
      application,
    } = req.body;

    try {
      let sql;
      if (id) {
        sql = `
          UPDATE on_demand SET 
            title='${title}',
            speaker='${speaker}',
            affiliation='${affiliation}',
            abstract_desc='${abstractDesc}',
            region='${region}',
            year='${year}',
            language='${language}',
            thumbnail='${thumbnail}',
            video='${video}',
            application='${application}'
          WHERE id=${id};
        `;
      } else {
        sql = `
        INSERT INTO on_demand (
          title,
          speaker,
          affiliation,
          abstract_desc,
          region,
          year,
          language,
          thumbnail,
          video,
          application
        ) VALUES (
          '${title}',
          '${speaker}',
          '${affiliation}',
          '${abstractDesc}',
          '${region}',
          '${year}',
          '${language}',
          '${thumbnail}',
          '${video}',
          '${application}'
        );
        `;
      }

      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  deleteOnDemandList: async (req, res) => {
    const currentPool = getCurrentPool("common");
    const connection = await currentPool.getConnection(async (conn) => conn);

    const { id } = req.query;
    try {
      const sql = `
      DELETE FROM on_demand WHERE id=${id};
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
};

module.exports = onDemandCtrl;
