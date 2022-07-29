<template>
    <apexchart 
        type="line"
        :height="$store.state.configurationsWeaponModelChartsHeight"
        :options="weaponModelChartOptions" 
        :series="weaponModelSeriesSet"
    ></apexchart>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "WeaponModelChart",

    components: {

    },

    props: {
        weaponFrame: {
            type: Object,
            required: true
        },
        payload: {
            type: Object,
            required: true
        },
        allowClick: {
            type: Boolean,
            required: false,
            default: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data: () => ({
        
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
        weaponModelChartOptions() {
            return {
                chart: {
                    animations: {
                        enabled: false,
                    },
                    background: 'rgba(0,0,0,0)',
                    fontFamily: 'Roboto, sans-serif',
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0],
                    offsetY: 0,
                    style: {
                        fontSize: '11px'
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '95%',
                        borderRadius: 5,
                        dataLabels: { 
                            position: 'top'
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    followCursor: true,
                    intersect: false,
                },
                title: {
                    // text: `${this.weaponFrame.Title} / ${this.payload.Title}`,
                    align: 'center',
                    style: {
                        fontSize: '18px',
                    }
                },
                theme: {
                    mode: this.$vuetify.theme.dark? 'dark' : 'light'
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickAmount: 4,
                    title: {
                        text: 'Hit Chance (%)',
                        style: {
                            fontSize: '16px',
                            cssClass: 'font-weight-bold'
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '16px',
                            cssClass: 'subtitle-1'
                        }
                    }
                },
                xaxis: {
                    type: 'numeric',
                    decimalsInFloat: 0,
                    tickAmount: 9,
                    min: 1,
                    max: 10,
                    title: {
                        text: 'Tiles Away from Target',
                        style: {
                            fontSize: '16px',
                            cssClass: 'font-weight-bold'
                        }
                    },
                    labels: {
                        style: {
                            cssClass: 'subtitle-1'
                        }
                    },
                    axisTicks: {
                        show: false
                    }
                }
            };
        },
        weaponModelIdealChartOptions() {
            return {
                chart: {
                    animations: {
                        enabled: false,
                    },
                    background: 'rgba(0,0,0,0)',
                    fontFamily: 'Roboto, sans-serif',
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    offsetY: 15,
                    style: {
                        fontSize: '11px'
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '95%',
                        borderRadius: 5
                    }
                },
                tooltip: {
                    shared: true,
                    followCursor: true,
                    intersect: false,
                },
                title: {
                    // text: `${this.weaponFrame.Title} / ${this.payload.Title}`,
                    align: 'center',
                    style: {
                        fontSize: '18px',
                    }
                },
                theme: {
                    mode: this.$vuetify.theme.dark? 'dark' : 'light'
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickAmount: 4,
                    title: {
                        text: 'Hit Chance (%)',
                        style: {
                            fontSize: '16px',
                            cssClass: 'font-weight-bold'
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '16px',
                            cssClass: 'subtitle-1'
                        }
                    }
                },
                xaxis: {
                    type: 'numeric',
                    decimalsInFloat: 0,
                    tickAmount: 9,
                    min: 1,
                    max: 10,
                    title: {
                        text: 'Tiles Away from Target',
                        style: {
                            fontSize: '16px',
                            cssClass: 'font-weight-bold'
                        }
                    },
                    labels: {
                        style: {
                            cssClass: 'subtitle-1'
                        }
                    },
                    axisTicks: {
                        show: false
                    }
                }
            };
        },
        payloadHitProbabilities() {
            let wf1TargetingEfficiency = this.weaponFrame.TargetingEfficiency;
            let wf1OptimalRange = this.weaponFrame.OptimalRange;
            let wf1EffectiveRange = this.weaponFrame.EffectiveRange;
            let wf1ReliabilitiesAtDistances = [];
            for (var i = 1; i <= 10; i++) {
                let exponent = -1 * (Math.pow(i - wf1OptimalRange, 2) / Math.pow(wf1EffectiveRange, 2))
                let wf1ReliabilityAtDistance = wf1TargetingEfficiency * Math.exp(exponent);

                wf1ReliabilitiesAtDistances.push(wf1ReliabilityAtDistance);
            }

            let p1Velocity = this.payload.Velocity;
            let targetEvasionsAtDistances = [];
            for (i = 1; i <= 10; i++) {
                let targetEvasionAtDistance = (this.$store.state.configurationsTargetManeuverability * Math.pow(i, 1.5)) / (20 * p1Velocity);

                targetEvasionsAtDistances.push(targetEvasionAtDistance);
            }

            let hitProbabilities = [];
            for (i = 0; i <= 9; i++) {
                let result = Math.round(((1 -targetEvasionsAtDistances[i]) * wf1ReliabilitiesAtDistances[i]) * 10000) / 100;
                if (result < 0) {
                    hitProbabilities.push(0);
                } else {
                    hitProbabilities.push(result);
                }
            }

            // let hitPercentages = [];
            // for (i = 0; i <= 9; i++) {
            //     hitPercentages.push(hitProbabilities[i] * 100);
            // }

            return hitProbabilities;
        },
        payloadIdealHitProbabilities() {
            let wf1TargetingEfficiency = this.weaponFrame.TargetingEfficiency;
            let wf1OptimalRange = this.weaponFrame.OptimalRange;
            let wf1EffectiveRange = this.weaponFrame.EffectiveRange;
            let wf1ReliabilitiesAtDistances = [];
            for (var i = 1; i <= 10; i++) {
                let exponent = -1 * (Math.pow(i - wf1OptimalRange, 2) / Math.pow(wf1EffectiveRange, 2))
                let wf1ReliabilityAtDistance = wf1TargetingEfficiency * Math.exp(exponent);

                wf1ReliabilitiesAtDistances.push(wf1ReliabilityAtDistance);
            }

            let p1Velocity = this.payload.Velocity;
            let targetEvasionsAtDistances = [];
            for (i = 1; i <= 10; i++) {
                let targetEvasionAtDistance = (0 * Math.pow(i, 1.5)) / (20 * p1Velocity);

                targetEvasionsAtDistances.push(targetEvasionAtDistance);
            }

            let hitProbabilities = [];
            for (i = 0; i <= 9; i++) {
                let result = Math.round(((1 -targetEvasionsAtDistances[i]) * wf1ReliabilitiesAtDistances[i]) * 10000) / 100;
                if (result < 0) {
                    hitProbabilities.push(0);
                } else {
                    hitProbabilities.push(result);
                }
            }

            // let hitPercentages = [];
            // for (i = 0; i <= 9; i++) {
            //     hitPercentages.push(hitProbabilities[i] * 100);
            // }

            return hitProbabilities;
        },
        weaponModelSeriesSet() {
            return [
                {
                    name: 'Payload Hit Chance (%)',
                    type: 'bar',
                    data: this.payloadHitProbabilities
                },
                {
                    name: 'Ideal Hit Chance (%)',
                    type: 'line',
                    data: this.payloadIdealHitProbabilities
                }
            ]
        },
    },

    methods: {
        
    },

    created() {
        
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
