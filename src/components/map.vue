<template>
  <div class="map">
    <div id="main" class="mapContainer"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
require("echarts/lib/chart/map");
require("echarts/lib/component/geo");
require("echarts/lib/chart/lines");
require("echarts/lib/chart/effectScatter");

export default {
  data() {
    return {};
  },
  components: {},
  filters: {},
  computed: {
    ...mapGetters({
      mapData: "mapData"
    })
  },
  watch: {
    mapData: {
      handler: function(val, oldVal) {
        console.log("val, oldVal");
        console.log(val);
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.mapData);
  },
  methods: {
    doPic() {},
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.$geoCoordMap[dataItem[0]];
        var toCoord = this.$geoCoordMap[dataItem[1]];
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord
            },
            {
              coord: toCoord
            }
          ]);
        }
      }
      return res;
    },
    getPoint(data) {
      console.log(data);
      let d1 = data.map(v => {
        return { name: v.name, coord: v.value };
      });
      let planePath =
        "image://http://ofvbasfrz.bkt.clouddn.com/yzf_benifit/banne3r/car.png";
      let points = {
        name: "地点",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 1,
        rippleEffect: {
          brushType: "stroke"
        },
        animation: false,
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{b}",
            fontSize: 8,
            fontWeight: "bold"
          },
          emphasis: {
            show: true,
            position: "right",
            formatter: "{b}"
          }
        },
        symbol: planePath,
        symbolSize: [37 / 2, 25 / 2],
        symbolOffset: [-10, 0],
        showEffectOn: "emphasis",
        itemStyle: {
          normal: {
            color: "#dd1d21",
            fontSize: 10
          }
        },
        data: data
      };
      return points;
    },
    getLine(data) {
      console.log("data");
      console.log(data);
      let planePath = "circle";
      let lines = [
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 5
          },
          animation: false,
          effect: {
            show: false
          },
          lineStyle: {
            normal: {
              // color: color[i],
              width: 2,
              opacity: 1,
              curveness: 0.2
            }
          },
          data: data
        }
      ];
      return lines;
    },
    initChart() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      let lineData = [["广东", "广西"], ["广西", "山东"], ["山东", "新疆"]];
      let val = this.mapData;
      console.log("this.mapData");
      console.log(this.mapData.lines);

      let linesSeries = this.getLine(val.lines);
      let point = val.citys;
      console.log(point);
      let pointsSeries = this.getPoint(point);
      console.log(pointsSeries);
      let option = {
        geo: {
          map: "china",
          silent: true,
          left: 10,
          // roam:true,
          right: 10,
          zlevel: 1,
          itemStyle: {
            normal: {
              color: "#fbce07",
              borderColor: "#f8a802",
              borderWidth: 1
            }
          }
        },
        series: [...linesSeries, pointsSeries]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  .mapContainer {
    width: 7.5rem;
    height: 6rem;
  }
}
</style>
