import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'RECH',
    lpAddresses: {
      97: '',
      3000: '0x363a6FD45e39cCD1be3220dc9550975C247BBC5F',
    },
    token: serializedTokens.tech,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 2,
    v1pid: 251,
    lpSymbol: 'RECH-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x4292E6a7dd6Bf4a33b48e0e934E7BA7352e5eD8b',
    },
    token: serializedTokens.rech,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 3,
    v1pid: 252,
    lpSymbol: 'USDS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.usds,
    quoteToken: serializedTokens.wech,
  },
  //    * V3 by order of release (some may be out of PID order due to multiplier boost)
  {
    pid: 102,
    lpSymbol: 'PEAK-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x41140a1650372Fb8cb2f71e335448ab8cfc1c4f3',
    },
    token: serializedTokens.peak,
    quoteToken: serializedTokens.wech,
    isCommunity: true,
    auctionHostingStartSeconds: 1654772400,
  },
  {
    pid: 93,
    v1pid: 524,
    lpSymbol: 'HAPPY-ECH',
    lpAddresses: {
      97: '',
      3000: '0x008604A38cD589680F7B8f085DC2D5B4F81151dB',
    },
    token: serializedTokens.happy,
    quoteToken: serializedTokens.wech,
    isCommunity: true,
    auctionHostingStartSeconds: 1654772400,
  },
  {
    pid: 94,
    v1pid: 525,
    lpSymbol: 'WZRD-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xee456d906a38e10680c9d157FFf143390e9681bA',
    },
    token: serializedTokens.wzrd,
    quoteToken: serializedTokens.usds,
    isCommunity: true,
    auctionHostingStartSeconds: 1654772400,
  },
  {
    pid: 40,
    v1pid: 390,
    lpSymbol: 'CHR-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x6045931e511ef7e53a4a817f971e0ca28c758809',
    },
    token: serializedTokens.chr,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 38,
    v1pid: 386,
    lpSymbol: 'HOTCROSS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xf23bad605e94de0e3b60c9718a43a94a5af43915',
    },
    token: serializedTokens.hotcross,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 96,
    lpSymbol: '8PAY-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x92c3E2cddDb0CE886bCA864151BD4d611A86E563',
    },
    token: serializedTokens['8pay'],
    quoteToken: serializedTokens.usds,
    isCommunity: true,
  },
  {
    pid: 101,
    lpSymbol: 'MIX-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x7618fdAb208aE23690dadD3aa4a42a442313d24E',
    },
    token: serializedTokens.MIX,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 100,
    lpSymbol: 'METIS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x69AFe59e88614501c3fDEb7480f12DBA0A414032',
    },
    token: serializedTokens.metis,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 99,
    lpSymbol: 'XCN-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xF01eD80d46759c0cf6A3e9c66856017d81284962',
    },
    token: serializedTokens.xcn,
    quoteToken: serializedTokens.wech,
    isCommunity: true,
  },
  {
    pid: 98,
    lpSymbol: 'GAL-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xbe6A4f74fdDc88853612C50D7404E059b37692D8',
    },
    token: serializedTokens.gal,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 97,
    lpSymbol: 'RPG-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x55cdb14855220b239Cf857A03849D96736b9103f',
    },
    token: serializedTokens.rpg,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 95,
    lpSymbol: 'aECHc-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x272c2CF847A49215A3A1D4bFf8760E503A06f880',
    },
    token: serializedTokens.aechc,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 92,
    v1pid: 523,
    lpSymbol: 'CEEK-ECH',
    lpAddresses: {
      97: '',
      3000: '0x046A9B3A9b743340eE2Bc4C6dDD35543E237C6c2',
    },
    token: serializedTokens.ceek,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 91,
    v1pid: 522,
    lpSymbol: 'TINC-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x0d5b9A0f4315a4bcE36D1Ea7d6B6d3123167aFAa',
    },
    token: serializedTokens.tinc,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 90,
    v1pid: 520,
    lpSymbol: 'PEX-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x5ca96E8bDe0Bc587DaC9e02422Fd205b1102DAa4',
    },
    token: serializedTokens.pex,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 89,
    v1pid: 519,
    lpSymbol: 'GMI-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x58d4B61983Ca0aFE6E352e90719F403E24e016F4',
    },
    token: serializedTokens.gmi,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 88,
    v1pid: 518,
    lpSymbol: 'FROYO-RECH LP',
    lpAddresses: {
      97: '',
      3000: '0x1CCc3cC95c8148477Afd18a552f03835Be9D182a',
    },
    token: serializedTokens.froyo,
    quoteToken: serializedTokens.rech,
  },
  {
    pid: 87,
    v1pid: 516,
    lpSymbol: 'BSW-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x8ca3ff14a52b080c54a6d1a405eeca02959d39fe',
    },
    token: serializedTokens.bsw,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 86,
    v1pid: 515,
    lpSymbol: 'DUET-RECH LP',
    lpAddresses: {
      97: '',
      3000: '0xbDF0aA1D1985Caa357A6aC6661D838DA8691c569',
    },
    token: serializedTokens.duet,
    quoteToken: serializedTokens.rech,
  },
  {
    pid: 85,
    v1pid: 514,
    lpSymbol: 'GMT-USDC LP',
    lpAddresses: {
      97: '',
      3000: '0x007EC643C7Cc33a70C083fC305c283dd009C8b94',
    },
    token: serializedTokens.gmt,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 84,
    v1pid: 513,
    lpSymbol: 'ERA-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x53a63ac301d6410915385294527f947aff616599',
    },
    token: serializedTokens.era,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 83,
    v1pid: 510,
    lpSymbol: 'BTT-USDS',
    lpAddresses: {
      97: '',
      3000: '0xB7E73DaEe6A6Ca37A21f8E4bfba4DA448DFE4d92',
    },
    token: serializedTokens.btt,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 82,
    v1pid: 509,
    lpSymbol: 'ACH-USDT',
    lpAddresses: {
      97: '',
      3000: '0x28BDb16b623176426305a70D8B475bE73Aca71f3',
    },
    token: serializedTokens.ach,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 81,
    v1pid: 507,
    lpSymbol: 'RACA-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x8e744ec2795c8b836689d1b4ebe1489204357dac',
    },
    token: serializedTokens.raca,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 80,
    v1pid: 506,
    lpSymbol: 'ERTHA-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x70531B39E2Bb4d8dA59E2Ce41a98eBA2990F8497',
    },
    token: serializedTokens.ertha,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 79,
    v1pid: 505,
    lpSymbol: 'FUSE-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x6483F166b9E4310A165a55FEa04F867499aded06',
    },
    token: serializedTokens.fuse,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 78,
    v1pid: 503,
    lpSymbol: 'FROYO-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x1Ce76390Dd210B9C9ae28373FDf79714206ECb73',
    },
    token: serializedTokens.froyo,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 77,
    v1pid: 502,
    lpSymbol: 'APX-USDS',
    lpAddresses: {
      97: '',
      3000: '0xa0ee789a8f581cb92dd9742ed0b5d54a0916976c',
    },
    token: serializedTokens.apx,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 76,
    v1pid: 501,
    lpSymbol: 'BCOIN-ECH',
    lpAddresses: {
      97: '',
      3000: '0x2Eebe0C34da9ba65521E98CBaA7D97496d05f489',
    },
    token: serializedTokens.bcoin,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 75,
    v1pid: 497,
    lpSymbol: 'AOG-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x88c9bf5E334e2591C6A866D5E20683E31226Be3d',
    },
    token: serializedTokens.aog,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 74,
    v1pid: 495,
    lpSymbol: 'WOOP-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x2AE94A6C768D59f5DDc25bd7f12C7cBE1D51dc04',
    },
    token: serializedTokens.woop,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 73,
    v1pid: 491,
    lpSymbol: 'HIGH-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xe98ac95A1dB2fCaaa9c7D4ba7ecfCE4877ca2bEa',
    },
    token: serializedTokens.high,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 72,
    v1pid: 489,
    lpSymbol: 'DPT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x141e9558f66Cc21c93628400cCa7d830c15c2c24',
    },
    token: serializedTokens.dpt,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 71,
    v1pid: 488,
    lpSymbol: 'THG-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x486697ae24469cB1122F537924Aa46E705B142Aa',
    },
    token: serializedTokens.thg,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 70,
    v1pid: 484,
    lpSymbol: 'IDIA-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x71E6de81381eFE0Aa98f56b3B43eB3727D640715',
    },
    token: serializedTokens.idia,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 69,
    v1pid: 481,
    lpSymbol: 'SANTOS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x06043B346450BbCfdE066ebc39fdc264FdFFeD74',
    },
    token: serializedTokens.santos,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 68,
    v1pid: 476,
    lpSymbol: 'QI-ECH',
    lpAddresses: {
      97: '',
      3000: '0xf924E642f05ACC57fc3b14990c2B1a137683b201',
    },
    token: serializedTokens.qi,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 67,
    v1pid: 474,
    lpSymbol: 'PORTO-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x0A292e96ABb35297786a38fDD67Dc4f82689E670',
    },
    token: serializedTokens.porto,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 66,
    v1pid: 472,
    lpSymbol: 'XWG-USDC LP',
    lpAddresses: {
      97: '',
      3000: '0x936928146a21AfCcd30DfA84824A780572B1630B',
    },
    token: serializedTokens.xwg,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 65,
    v1pid: 471,
    lpSymbol: 'DAR-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x062f88E2B4896e823ac78Ac314468c29eEC4186d',
    },
    token: serializedTokens.dar,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 64,
    v1pid: 470,
    lpSymbol: 'FINA-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x6dB23b5360c9D2859fDcbf41c56494e7b8573649',
    },
    token: serializedTokens.fina,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 63,
    v1pid: 466,
    lpSymbol: 'DKT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x365c3F921b2915a480308D0b1C04aEF7B99c2876',
    },
    token: serializedTokens.dkt,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 62,
    v1pid: 464,
    lpSymbol: 'LAZIO-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x11c0b2bb4fbb430825d07507a9e24e4c32f7704d',
    },
    token: serializedTokens.lazio,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 61,
    v1pid: 461,
    lpSymbol: 'BETA-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x88a02d94f437799f06f8c256ff07aa397e6d0016',
    },
    token: serializedTokens.beta,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 60,
    v1pid: 457,
    lpSymbol: 'NFT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x0ecc84c9629317a494f12bc56aa2522475bf32e8',
    },
    token: serializedTokens.nft,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 59,
    v1pid: 450,
    lpSymbol: 'SFUND-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x74fA517715C4ec65EF01d55ad5335f90dce7CC87',
    },
    token: serializedTokens.sfund,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 58,
    v1pid: 449,
    lpSymbol: 'BP-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x2bF2dEB40639201C9A94c9e33b4852D9AEa5fd2D',
    },
    token: serializedTokens.bp,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 57,
    v1pid: 448,
    lpSymbol: 'RUSD-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x59FaC9e98479fc9979aE2a0C7422Af50bCBB9B26',
    },
    token: serializedTokens.rusd,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 56,
    v1pid: 442,
    lpSymbol: 'TRX-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xb5d108578be3750209d1b3a8f45ffee8c5a75146',
    },
    token: serializedTokens.trx,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 55,
    v1pid: 441,
    lpSymbol: 'WIN-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x6a445ceb72c8b1751755386c3990055ff92e14a0',
    },
    token: serializedTokens.win,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 54,
    v1pid: 432,
    lpSymbol: 'SPS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xfdfde3af740a22648b9dd66d05698e5095940850',
    },
    token: serializedTokens.sps,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 53,
    v1pid: 431,
    lpSymbol: 'C98-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x92247860A03F48d5c6425c7CA35CDcFCB1013AA1',
    },
    token: serializedTokens.c98,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 52,
    v1pid: 430,
    lpSymbol: 'AXS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xC2d00De94795e60FB76Bc37d899170996cBdA436',
    },
    token: serializedTokens.axs,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 51,
    v1pid: 429,
    lpSymbol: 'CHESS-USDC LP',
    lpAddresses: {
      97: '',
      3000: '0x1472976e0b97f5b2fc93f1fff14e2b5c4447b64f',
    },
    token: serializedTokens.chess,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 50,
    v1pid: 427,
    lpSymbol: 'ONE-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x9d2296e2fe3cdbf2eb3e3e2ca8811bafa42eedff',
    },
    token: serializedTokens.harmony,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 49,
    v1pid: 425,
    lpSymbol: 'DVI-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x89ebf9cd99864f6e51bd7a578965922029cab977',
    },
    token: serializedTokens.dvi,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 48,
    v1pid: 423,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      97: '',
      3000: '0xec6557348085aa57c72514d67070dc863c0a5a8c',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 47,
    v1pid: 422,
    lpSymbol: 'RECH-USDT LP',
    lpAddresses: {
      97: '',
      3000: '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
    },
    token: serializedTokens.rech,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 46,
    v1pid: 421,
    lpSymbol: 'BSCPAD-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xba01662e978de7d67f8ffc937726215eb8995d17',
    },
    token: serializedTokens.bscpad,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 45,
    v1pid: 414,
    lpSymbol: 'WOO-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x89eE0491CE55d2f7472A97602a95426216167189',
    },
    token: serializedTokens.woo,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 44,
    v1pid: 409,
    lpSymbol: 'ETH-USDC LP',
    lpAddresses: {
      97: '',
      3000: '0xEa26B78255Df2bBC31C1eBf60010D78670185bD0',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 43,
    v1pid: 408,
    lpSymbol: 'BTCB-ETH LP',
    lpAddresses: {
      97: '',
      3000: '0xD171B26E4484402de70e3Ea256bE5A2630d7e88D',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 42,
    v1pid: 405,
    lpSymbol: 'MBOX-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x8FA59693458289914dB0097F5F366d771B7a7C3F',
    },
    token: serializedTokens.mbox,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 41,
    v1pid: 397,
    lpSymbol: 'TUSD-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x2e28b9b74d6d99d4697e913b82b41ef1cac51c6c',
    },
    token: serializedTokens.tusd,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 39,
    v1pid: 389,
    lpSymbol: 'RECH-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x804678fa97d91B974ec2af3c843270886528a9E6',
    },
    token: serializedTokens.rech,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 37,
    v1pid: 376,
    lpSymbol: 'DOGE-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xac109c8025f272414fd9e2faa805a583708a017f',
    },
    token: serializedTokens.doge,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 36,
    v1pid: 365,
    lpSymbol: 'BTCB-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xf45cd219aef8618a92baa7ad848364a158a24f33',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 35,
    v1pid: 362,
    lpSymbol: 'ALPACA-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x7752e1fa9f3a2e860856458517008558deb989e3',
    },
    token: serializedTokens.alpaca,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 34,
    v1pid: 352,
    lpSymbol: 'TLM-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xE6b421a4408c82381b226Ab5B6F8C4b639044359',
    },
    token: serializedTokens.tlm,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 33,
    v1pid: 350,
    lpSymbol: 'EPS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xddE420cbB3794ebD8FFC3Ac69F9c78e5d1411870',
    },
    token: serializedTokens.eps,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 32,
    v1pid: 346,
    lpSymbol: 'TKO-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xFFd4B200d3C77A0B691B5562D804b3bd54294e6e',
    },
    token: serializedTokens.tko,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 31,
    v1pid: 326,
    lpSymbol: 'BIFI-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x3f1A9f3D9aaD8bD339eD4853F345d2eF89fbfE0c',
    },
    token: serializedTokens.bifi,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 30,
    v1pid: 322,
    lpSymbol: 'ALICE-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xcAD7019D6d84a3294b0494aEF02e73BD0f2572Eb',
    },
    token: serializedTokens.alice,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 29,
    v1pid: 318,
    lpSymbol: 'BELT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xF3Bc6FC080ffCC30d93dF48BFA2aA14b869554bb',
    },
    token: serializedTokens.belt,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 28,
    v1pid: 317,
    lpSymbol: 'RAMP-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xE834bf723f5bDff34a5D1129F3c31Ea4787Bc76a',
    },
    token: serializedTokens.ramp,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 27,
    v1pid: 309,
    lpSymbol: 'IOTX-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xc13aA76AAc067c86aE38028019F414D731b3D86A',
    },
    token: serializedTokens.iotx,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 26,
    v1pid: 306,
    lpSymbol: 'SUSHI-ETH LP',
    lpAddresses: {
      97: '',
      3000: '0x16aFc4F2Ad82986bbE2a4525601F8199AB9c832D',
    },
    token: serializedTokens.sushi,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 25,
    v1pid: 299,
    lpSymbol: 'SFP-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x942b294e59a8c47a0F7F20DF105B082710F7C305',
    },
    token: serializedTokens.sfp,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 24,
    v1pid: 298,
    lpSymbol: 'LINA-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0xC5768c5371568Cf1114cddD52CAeD163A42626Ed',
    },
    token: serializedTokens.lina,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 23,
    v1pid: 293,
    lpSymbol: 'UST-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x05faf555522Fa3F93959F86B41A3808666093210',
    },
    token: serializedTokens.ust,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 22,
    v1pid: 285,
    lpSymbol: 'BTCST-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xB2678C414ebC63c9CC6d1a0fC45f43E249B50fdE',
    },
    token: serializedTokens.btcst,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 21,
    v1pid: 284,
    lpSymbol: 'LTC-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x71b01eBdDD797c8E9E0b003ea2f4FD207fBF46cC',
    },
    token: serializedTokens.ltc,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 20,
    v1pid: 283,
    lpSymbol: 'USDC-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 19,
    v1pid: 282,
    lpSymbol: 'DAI-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 18,
    v1pid: 276,
    lpSymbol: 'VAI-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x133ee93FE93320e1182923E1a640912eDE17C90C',
    },
    token: serializedTokens.vai,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 17,
    v1pid: 268,
    lpSymbol: 'SXP-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xD8E2F8b6Db204c405543953Ef6359912FE3A88d6',
    },
    token: serializedTokens.sxp,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 16,
    v1pid: 270,
    lpSymbol: 'INJ-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x1BdCebcA3b93af70b58C41272AEa2231754B23ca',
    },
    token: serializedTokens.inj,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 15,
    v1pid: 268,
    lpSymbol: 'UNI-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x014608E87AF97a054C9a49f81E1473076D51d9a3',
    },
    token: serializedTokens.uni,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 14,
    v1pid: 265,
    lpSymbol: 'XRP-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x03F18135c44C64ebFdCBad8297fe5bDafdBbdd86',
    },
    token: serializedTokens.xrp,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 13,
    v1pid: 264,
    lpSymbol: 'USDT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 12,
    v1pid: 263,
    lpSymbol: 'ALPHA-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xACF47CBEaab5c8A6Ee99263cfE43995f89fB3206',
    },
    token: serializedTokens.alpha,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 11,
    v1pid: 262,
    lpSymbol: 'BTCB-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 10,
    v1pid: 261,
    lpSymbol: 'ETH-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 9,
    v1pid: 260,
    lpSymbol: 'XVS-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x7EB5D86FD78f3852a3e0e064f2842d45a3dB6EA2',
    },
    token: serializedTokens.xvs,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 8,
    v1pid: 259,
    lpSymbol: 'TWT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x3DcB1787a95D2ea0Eb7d00887704EeBF0D79bb13',
    },
    token: serializedTokens.twt,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 7,
    v1pid: 258,
    lpSymbol: 'USDT-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.usds,
  },
  {
    pid: 6,
    v1pid: 257,
    lpSymbol: 'LINK-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x824eb9faDFb377394430d2744fa7C42916DE3eCe',
    },
    token: serializedTokens.link,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 5,
    v1pid: 255,
    lpSymbol: 'DOT-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF',
    },
    token: serializedTokens.dot,
    quoteToken: serializedTokens.wech,
  },
  {
    pid: 4,
    v1pid: 253,
    lpSymbol: 'ADA-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F',
    },
    token: serializedTokens.ada,
    quoteToken: serializedTokens.wech,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
