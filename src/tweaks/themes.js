ytTweaks.tweaks.push(function (settings) {
    if ((settings.darkThemes && (settings.dtEnableOnLightMode || document.documentElement.attributes.dark)) || (settings.lightThemes && !document.documentElement.attributes.dark)) {
        let accent, text, bg, btn, btnOpacity, btnHoverOpacity, btnSolid, filledBtnHover, red, green, black, white, white2, accentInverted;
        if (settings.darkThemes && (settings.dtEnableOnLightMode || document.documentElement.attributes.dark)) {
            switch (settings.darkThemes) {
                case 'Remedy Dark':
                    accent = '235, 104, 75';
                    text = '247, 224, 180';
                    bg = '63, 52, 51';
                    btn = '0, 0, 0';
                    btnOpacity = '0.17';
                    btnHoverOpacity = '0.34';
                    btnSolid = ' #342b2a';
                    filledBtnHover = ' #bc543d';
                    red = '#eb684b';
                    green = '#90eb4b';
                    black = '0, 0, 0';
                    accentInverted = '#1497b4';

                    break;

                case 'Dark Magic':
                    accent = '102, 238, 170';
                    text = '187, 204, 238';
                    bg = '15, 15, 23';
                    btn = '0, 0, 7';
                    btnOpacity = '0.50';
                    btnHoverOpacity = '1';
                    btnSolid = ' #07070f';
                    filledBtnHover = ' #56c18d';
                    red = '#ee6666';
                    green = '#66eeaa';
                    accentInverted = '#991155';

                    break;

                case 'Dark Magic Dracula':
                    accent = '102, 238, 170';
                    text = '204, 227, 245';
                    bg = '40, 42, 54';
                    btn = '0, 0, 3';
                    btnOpacity = '0.24';
                    btnHoverOpacity = '0.48';
                    btnSolid = ' #1e202a';
                    filledBtnHover = ' #5bc694';
                    red = '#ee6666';
                    green = '#66eeaa';
                    accentInverted = '#991155';

                    break;

                case 'Dark Magic Frankenstein':
                    accent = '102, 238, 170';
                    text = '182, 232, 207';
                    bg = '15, 23, 21';
                    btn = '0, 10, 5';
                    btnOpacity = '0.7';
                    btnHoverOpacity = '1';
                    btnSolid = ' #040e0a';
                    filledBtnHover = ' #56c28d';
                    red = '#ee6666';
                    green = '#66eeaa';
                    accentInverted = '#991155';

                    break;

                case 'Dark Magic Night':
                    accent = '102, 238, 170';
                    text = '204, 204, 204';
                    bg = '17, 17, 17';
                    btn = '0, 0, 0';
                    btnOpacity = '0.4';
                    btnHoverOpacity = '0.8';
                    btnSolid = ' #0a0a0a';
                    filledBtnHover = ' #57c28d';
                    red = '#ee6666';
                    green = '#66eeaa';
                    accentInverted = '#991155';

                    break;

                case 'Dark Magic Nord':
                    accent = '102, 238, 170';
                    text = '216, 222, 233';
                    bg = '46, 52, 64';
                    btn = '0, 0, 3';
                    btnOpacity = '0.2';
                    btnHoverOpacity = '0.4';
                    btnSolid = ' #252a34';
                    filledBtnHover = ' #5cc996';
                    red = '#ee6666';
                    green = '#66eeaa';
                    accentInverted = '#991155';

                    break;

                case 'Dark Magic Tokyo':
                    accent = '102, 238, 170';
                    text = '120, 124, 153';
                    bg = '22, 22, 30';
                    btn = '0, 0, 5';
                    btnOpacity = '0.3';
                    btnHoverOpacity = '0.6';
                    btnSolid = ' #0f0f17';
                    filledBtnHover = ' #57c28f';
                    red = '#ee6666';
                    green = '#66eeaa';
                    accentInverted = '#991155';

                    break;

                case 'Wired':
                    accent = '210, 115, 138';
                    text = '193, 180, 146';
                    bg = '0, 0, 0';
                    btn = '120, 120, 120';
                    btnSolid = ' #0c0c0c';
                    filledBtnHover = ' #a85d70';
                    red = '#d27373';
                    green = '#8bd273';
                    accentInverted = '#2d8c75';

                    break;

                case 'Wired Brighter':
                    accent = '210, 115, 138';
                    text = '193, 180, 146';
                    bg = '3, 7, 27';
                    btn = '100, 126, 180';
                    btnSolid = ' #0d132a';
                    filledBtnHover = ' #a85d70';
                    red = '#d27373';
                    green = '#8bd273';
                    accentInverted = '#2d8c75';

                    break;

                case 'Spacedust':
                    accent = '227, 91, 0';
                    text = '236, 240, 193';
                    bg = '10, 30, 36';
                    btn = '89, 189, 220';
                    btnSolid = ' #122e36';
                    filledBtnHover = ' #eb7d33';
                    red = '#e31a00';
                    green = '#72e300';
                    white = '255, 255, 255';
                    accentInverted = '#1ca4ff';

                    break;

                case 'Noctis':
                    accent = '64, 212, 231';
                    text = '178, 202, 205';
                    bg = '5, 37, 41';
                    btn = '67, 211, 230';
                    btnSolid = ' #0b373c';
                    filledBtnHover = ' #35b0c0';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#bf2b18';

                    break;

                case 'Noctis Azureus':
                    accent = '73, 172, 233';
                    text = '190, 207, 218';
                    bg = '7, 39, 59';
                    btn = '57, 163, 230';
                    btnSolid = ' #0c344c';
                    filledBtnHover = ' #3b92c6';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#b65316';

                    break;

                case 'Noctis Bordo':
                    accent = '241, 142, 176';
                    text = '203, 190, 194';
                    bg = '50, 42, 45';
                    btn = '200, 100, 135';
                    btnSolid = ' #413036';
                    filledBtnHover = ' #cb7a96';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#0e714f';

                    break;

                case 'Noctis Minimus':
                    accent = '89, 152, 192';
                    text = '197, 205, 211';
                    bg = '36, 51, 61';
                    btn = '149, 197, 230';
                    btnSolid = ' #2f424e';
                    filledBtnHover = ' #4e84a6';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#a6673f';

                    break;

                case 'Noctis Obscuro':
                    accent = '22, 159, 177';
                    text = '178, 202, 205';
                    bg = '3, 20, 23';
                    btn = '20, 190, 200';
                    btnSolid = ' #052529';
                    filledBtnHover = ' #138393';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#e9604e';

                    break;

                case 'Noctis Sereno':
                    accent = '64, 212, 231';
                    text = '178, 202, 205';
                    bg = '6, 46, 50';
                    btn = '62, 213, 230';
                    btnSolid = ' #0b3f44';
                    filledBtnHover = ' #34b3c3';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#bf2b18';

                    break;

                case 'Noctis Uva':
                    accent = '153, 142, 241';
                    text = '197, 194, 214';
                    bg = '41, 38, 64';
                    btn = '158, 149, 230';
                    btnSolid = ' #353150';
                    filledBtnHover = ' #827ace';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#66710e';

                    break;

                case 'Noctis Viola':
                    accent = '191, 142, 241';
                    text = '204, 191, 217';
                    bg = '48, 36, 61';
                    btn = '188, 149, 230';
                    btnSolid = ' #3e2f4e';
                    filledBtnHover = ' #a379cd';
                    red = '#e74040';
                    green = '#40e778';
                    white2 = '255, 255, 255';
                    accentInverted = '#40710e';

                    break;

                case 'Ilicit Purple':
                    accent = '191, 119, 246';
                    text = '216, 196, 241';
                    bg = '28, 25, 41';
                    btn = '172, 158, 230'; // bg rgba add 10 to all values, cymk set last value to 10% //
                    btnSolid = ' #2b263c';
                    filledBtnHover = ' #9f64cd';
                    red = '#f57676';
                    green = '#76f576';
                    accentInverted = '#408809'; // https://wtools.io/invert-color-code-online //

                    break;

                case 'Icy Blue':
                    accent = '150, 205, 251';
                    text = '224, 224, 224';
                    bg = '19, 26, 28';
                    btn = '174, 218, 230';
                    btnSolid = ' #232d30';
                    filledBtnHover = ' #7ca9cf';
                    red = '#fb9696';
                    green = '#96fa96';
                    accentInverted = '#693204';

                    break;

                case 'Gruvbox':
                    accent = '142, 192, 124';
                    text = '235, 219, 178';
                    bg = '40, 40, 40';
                    btn = '230, 230, 230';
                    btnSolid = ' #3b3b3b';
                    filledBtnHover = ' #7aa26b';
                    red = '#fb4934';
                    green = '#8ec07c';
                    accentInverted = '#713f83';

                    break;

                case 'Gruvbox Black':
                    accent = '184, 187, 38';
                    text = '242, 229, 188';
                    bg = '0, 0, 0';
                    btn = '110, 110, 110';
                    btnSolid = ' #0b0b0b';
                    filledBtnHover = ' #93951e';
                    red = '#fb4934';
                    green = '#8ec07c';
                    accentInverted = '#713f83';

                    break;

                case 'Opulo':
                    accent = '255, 151, 177';
                    text = '172, 202, 234';
                    bg = '7, 36, 44';
                    btn = '71, 195, 230';
                    btnSolid = ' #0d343f';
                    filledBtnHover = ' #cd8097';
                    red = '#ff9797';
                    green = '#9aff97';
                    accentInverted = '#00684e';

                    break;

                case 'Dune':
                    accent = '222, 100, 83';
                    text = '247, 177, 146';
                    bg = '46, 19, 23';
                    btn = '255, 160, 160';
                    btnSolid = ' #432125';
                    filledBtnHover = ' #bb5447';
                    red = '#de5a53';
                    green = '#53de5c';
                    accentInverted = '#219bac';

                    break;

                case 'Solarized':
                    accent = '38, 139, 210';
                    text = '201, 209, 224';
                    bg = '0, 43, 54';
                    btn = '37, 190, 230';
                    btnSolid = ' #043a47';
                    filledBtnHover = ' #51a2db';
                    red = '#dc322f';
                    green = '#859900';
                    white = '255, 255, 255';

                    break;

                case 'Dusklight':
                    accent = '255, 128, 0';
                    text = '153, 223, 255';
                    bg = '4, 20, 46';
                    btn = '92, 157, 255';
                    btnSolid = ' #0d2243';
                    filledBtnHover = ' #cd6a09';
                    red = '#ff5252';
                    green = '#00ffbb';
                    accentInverted = '#007fff';

                    break;

                case 'Space Blue':
                    accent = '151, 254, 253';
                    text = '100, 206, 255';
                    bg = '0, 32, 36';
                    btn = '200, 225, 232';
                    btnSolid = ' #143438';
                    filledBtnHover = ' #79d1d1';
                    red = '#fe9797';
                    green = '#97fec2';
                    accentInverted = '#680102';

                    break;

                case 'Nature':
                    accent = '146, 207, 156';
                    text = '173, 230, 161';
                    bg = '7, 16, 7';
                    btn = '190, 210, 185';
                    btnSolid = ' #192319';
                    filledBtnHover = ' #76a97e';
                    red = '#cf9292';
                    green = '#92cf9b';
                    accentInverted = '#6d3063';

                    break;

                case 'Sweet':
                    accent = '197, 14, 210';
                    text = '195, 199, 209';
                    bg = '24, 27, 40';
                    btn = '156, 174, 230';
                    btnSolid = ' #262a3b';
                    filledBtnHover = ' #d13edb';
                    red = '#e6133e';
                    green = '#0096b1';
                    white = '255, 255, 255';

                    break;

                case 'Flexoki':
                    accent = '58, 169, 159';
                    text = '206, 205, 195';
                    bg = '16, 15, 15';
                    btn = '230, 220, 220';
                    btnSolid = ' #252323';
                    filledBtnHover = ' #318a82';
                    red = '#D14D41';
                    green = '#879A39';
                    accentInverted = '#c55660';

                    break;

                case 'Hot Iron':
                    accent = '255, 165, 87';
                    text = '226, 209, 255';
                    bg = '31, 12, 12';
                    btn = '222, 182, 182';
                    btnSolid = ' #331e1e';
                    filledBtnHover = ' #d28648';
                    red = '#ff5757';
                    green = '#57ff68';
                    accentInverted = '#005aa8';

                    break;

                case 'Flaming Ruby':
                    accent = '245, 58, 92';
                    text = '192, 192, 192';
                    bg = '11, 1, 3';
                    btn = '190, 110, 130';
                    btnSolid = ' #1d0c10';
                    filledBtnHover = ' #c62e4b';
                    red = '#f53a3a';
                    green = '#3af550';
                    accentInverted = '#0ac5a3';

                    break;

                case 'Obsidian':
                    accent = '255, 173, 0';
                    text = '218, 218, 218';
                    bg = '19, 12, 31';
                    btn = '212, 203, 233';
                    btnSolid = ' #272034';
                    filledBtnHover = ' #d08c06';
                    red = '#ff0000';
                    green = '#00ff48';
                    white2 = '255, 255, 255';
                    accentInverted = '#0052ff';

                    break;

                case 'Ophéline':
                    accent = '231, 127, 163';
                    text = '245, 245, 245';
                    bg = '63, 16, 39';
                    btn = '230, 174, 201';
                    btnSolid = ' #502037';
                    filledBtnHover = ' #c6698a';
                    red = '#e77f7f';
                    green = '#7fe78f';
                    accentInverted = '#18805c';

                    break;

                case 'Shades-of-Purple':
                    accent = '250, 208, 0';
                    text = '238, 238, 238';
                    bg = '37, 20, 61';
                    btn = '242, 222, 255';
                    btnSolid = ' #3a2951';
                    filledBtnHover = ' #cfaa0c';
                    red = '#fa0000';
                    green = '#00fa15';
                    white2 = '255, 255, 255';
                    accentInverted = '#052fff';

                    break;

                case 'Neon':
                    accent = '0, 242, 155';
                    text = '224, 224, 224';
                    bg = '26, 28, 31';
                    btn = '202, 213, 230';
                    btnSolid = ' #2c2f33';
                    filledBtnHover = ' #05c882';
                    red = '#ff263c';
                    green = '#00f29b';
                    accentInverted = '#ff0d64';
                    white2 = '255, 255, 255';

                    break;

                case 'Yaru':
                    accent = '233, 84, 32';
                    text = '247, 247, 247';
                    bg = '44, 44, 44';
                    btn = '230, 230, 230';
                    btnSolid = ' #3f3f3f';
                    filledBtnHover = ' #ed764d';
                    red = '#c7162b';
                    green = '#16c731';
                    white = '255, 255, 255';

                    break;

                case 'Qogir Ubuntu':
                    accent = '251, 132, 65';
                    text = '211, 218, 227';
                    bg = '40, 42, 51';
                    btn = '188, 195, 230';
                    btnSolid = ' #373a45';
                    filledBtnHover = ' #fc9d67';
                    red = '#fc4138';
                    green = '#73d216';
                    white = '255, 255, 255';

                    break;

                case 'Sunset':
                    accent = '255, 138, 101';
                    text = '248, 240, 211';
                    bg = '23, 23, 23';
                    btn = '230, 230, 230';
                    btnSolid = ' #2c2c2c';
                    filledBtnHover = ' #d17356';
                    red = '#ff6666';
                    green = '#66ff66';
                    accentInverted = '#00759a';

                    break;

                case 'Catppuccin Mocha':
                    accent = '137, 180, 250';
                    text = '205, 214, 244';
                    bg = '30, 30, 46';
                    btn = '163, 163, 230';
                    btnSolid = ' #2c2c40';
                    filledBtnHover = ' #7496d1';
                    red = '#f38ba8';
                    green = '#a6e3a1';
                    accentInverted = '#764b05';

                    break;

                case 'Catppuccin Macchiato':
                    accent = '138, 173, 244';
                    text = '202, 211, 245';
                    bg = '36, 39, 58';
                    btn = '156, 165, 230';
                    btnSolid = ' #30344b';
                    filledBtnHover = ' #7592cf';
                    red = '#ed8796';
                    green = '#a6da95';
                    accentInverted = '#75520b';

                    break;

                case 'Catppuccin Frappe':
                    accent = '140, 170, 238';
                    text = '198, 208, 245';
                    bg = '48, 52, 70';
                    btn = '165, 179, 230';
                    btnSolid = ' #3c4156';
                    filledBtnHover = ' #7a92cc';
                    red = '#e78284';
                    green = '#a6d189';
                    accentInverted = '#735511';

                    break;

                case 'Bearded Theme Coffee':
                    accent = '240, 145, 119';
                    text = '206, 181, 176';
                    bg = '41, 36, 35';
                    btn = '0, 0, 0';
                    btnOpacity = '0.23';
                    btnHoverOpacity = '0.46';
                    btnSolid = '#201c1b';
                    filledBtnHover = '#c87a65';
                    red = '#f24343';
                    green = '#9dcc57';
                    white2 = '255, 255, 255';
                    accentInverted = '#0f6e88';

                    break;

                case 'Bearded Theme Coffee Reversed':
                    accent = '240, 145, 119';
                    text = '200, 172, 165';
                    bg = '26, 23, 22';
                    btn = '140, 130, 130';
                    btnSolid = '#252221';
                    filledBtnHover = '#c57762';
                    red = '#f24343';
                    green = '#9dcc57';
                    white2 = '255, 255, 255';
                    accentInverted = '#0f6e88';

                    break;

                case 'Bearded Theme Earth':
                    accent = '211, 83, 134';
                    text = '202, 165, 165';
                    bg = '34, 27, 27';
                    btn = '0, 0, 0';
                    btnOpacity = '0.30';
                    btnHoverOpacity = '0.60';
                    btnSolid = '#181313';
                    filledBtnHover = '#b04971';
                    red = '#c13838';
                    green = '#639e29';
                    accentInverted = '#2cac79';

                    break;

                case 'Bearded Theme Oceanic':
                    accent = '151, 200, 146';
                    text = '205, 221, 230';
                    bg = '26, 43, 52';
                    btn = '0, 0, 0';
                    btnOpacity = '0.20';
                    btnHoverOpacity = '0.40';
                    btnSolid = '#15222a';
                    filledBtnHover = '#7fa87f';
                    red = '#b4552d';
                    green = '#97c892';
                    white2 = '255, 255, 255';
                    accentInverted = '#68376d';

                    break;

                case 'Bearded Theme Oceanic Reversed':
                    accent = '151, 200, 146';
                    text = '195, 214, 224';
                    bg = '17, 28, 34';
                    btn = '125, 163, 165';
                    btnSolid = '#1c2a30';
                    filledBtnHover = '#7da67c';
                    red = '#b4552d';
                    green = '#97c892';
                    white2 = '255, 255, 255';
                    accentInverted = '#68376d';

                    break;

                case 'Bearded Theme HC Minuit':
                    accent = '236, 196, 140';
                    text = '205, 200, 220';
                    bg = '28, 24, 39';
                    btn = '0, 0, 0';
                    btnOpacity = '0.30';
                    btnHoverOpacity = '0.60';
                    btnSolid = '#14111b';
                    filledBtnHover = '#c2a379';
                    red = '#fb7a6c';
                    green = '#69d2ab';
                    accentInverted = '#133b73';

                    break;

                case 'Bearded Theme Surprising Eggplant':
                    accent = '210, 78, 78';
                    text = '208, 193, 222';
                    bg = '29, 20, 38';
                    btn = '0, 0, 0';
                    btnOpacity = '0.30';
                    btnHoverOpacity = '0.60';
                    btnSolid = '#140e1b';
                    filledBtnHover = '#ad4245';
                    red = '#c13838';
                    green = '#a9dc76';
                    white2 = '255, 255, 255';
                    accentInverted = '#2db1b1';

                    break;

                case 'Bearded Theme Surprising Blueberry':
                    accent = '201, 62, 113';
                    text = '186, 203, 228';
                    bg = '16, 26, 41';
                    btn = '0, 0, 0';
                    btnOpacity = '0.30';
                    btnHoverOpacity = '0.60';
                    btnSolid = '#0b121d';
                    filledBtnHover = '#a43863';
                    red = '#b85c40';
                    green = '#a9dc76';
                    accentInverted = '#36c18e';

                    break;

                case 'Rosé Pine':
                    accent = '235, 188, 186';
                    text = '224, 222, 244';
                    bg = '25, 23, 36';
                    btn = '174, 165, 230';
                    btnSolid = ' #282637';
                    filledBtnHover = ' #c19b9c';
                    red = '#eb6f92';
                    green = '#9ccfd8';
                    accentInverted = '#144345';

                    break;

                case 'Rosé Pine Moon':
                    accent = '235, 188, 186';
                    text = '224, 222, 244';
                    bg = '35, 33, 53';
                    btn = '163, 156, 230';
                    btnSolid = ' #302e47';
                    filledBtnHover = ' #c39da0';
                    red = '#eb6f92';
                    green = '#9ccfd8';
                    accentInverted = '#144345';

                    break;

                case 'Everforest':
                    accent = '167, 192, 128';
                    text = '211, 198, 170';
                    bg = '43, 51, 57';
                    btn = '181, 209, 230';
                    btnSolid = ' #39434a';
                    filledBtnHover = ' #8fa471';
                    red = '#e67e80';
                    green = '#a7c080';
                    accentInverted = '#583f7f';

                    break;

                case 'Kanagawa':
                    accent = '230, 195, 132';
                    text = '220, 215, 186';
                    bg = '31, 31, 40';
                    btn = '188, 188, 230';
                    btnSolid = ' #2f2f3b';
                    filledBtnHover = ' #bea272';
                    red = '#c34043';
                    green = '#76946a';
                    accentInverted = '#193c7b';
                    white2 = '255, 255, 255';

                    break;

                case 'Nord':
                    accent = '136, 192, 208';
                    text = '236, 239, 244';
                    bg = '46, 52, 64';
                    btn = '0, 0, 0';
                    btnOpacity = '0.2';
                    btnHoverOpacity = '0.4';
                    btnSolid = ' #252a33';
                    filledBtnHover = ' #76a4b3';
                    red = '#bf616a';
                    green = '#a3be8c';
                    accentInverted = '#773f2f';
                    white2 = '255, 255, 255';

                    break;

                case 'White Oak Chillhop':
                    accent = '254, 173, 130';
                    text = '204, 204, 204';
                    bg = '21, 37, 40';
                    btn = '0, 0, 0';
                    btnOpacity = '0.25';
                    btnHoverOpacity = '0.5';
                    btnSolid = ' #101c1e';
                    filledBtnHover = ' #e65c56';
                    red = '#e65c56';
                    green = '#7aa4a1';
                    accentInverted = '#01527d';

                    break;

                case 'Sleek Coral':
                    accent = '248, 131, 121';
                    text = '215, 215, 215';
                    bg = '19, 28, 38';
                    btn = '138, 181, 230';
                    btnSolid = ' #1f2b39';
                    filledBtnHover = ' #ca6f69';
                    red = '#f88379';
                    green = '#79f788';
                    accentInverted = '#077c86';

                    break;

                case 'Sleek Cherry':
                    accent = '217, 139, 161';
                    text = '215, 215, 215';
                    bg = '19, 28, 38';
                    btn = '138, 181, 230';
                    btnSolid = ' #1f2b39';
                    filledBtnHover = ' #b27589';
                    red = '#f88379';
                    green = '#79f788';
                    accentInverted = '#26745e';

                    break;

                case 'Sleek Futura':
                    accent = '52, 173, 126';
                    text = '222, 222, 222';
                    bg = '46, 40, 55';
                    btn = '197, 177, 230';
                    btnSolid = ' #3d3648';
                    filledBtnHover = ' #339270';
                    red = '#d06262';
                    green = '#34ad7e';
                    accentInverted = '#cb5281';

                    break;

                case 'Sleek BladeRunner':
                    accent = '220, 216, 140';
                    text = '159, 191, 183';
                    bg = '24, 27, 30';
                    btn = '195, 213, 230';
                    btnSolid = ' #2a2e32';
                    filledBtnHover = ' #b5b276';
                    red = '#f6867c';
                    green = '#7af57a';
                    accentInverted = '#232773';

                    break;

                case 'Pastel Green':
                    accent = '137, 232, 148';
                    text = '236, 239, 244';
                    bg = '16, 19, 26';
                    btn = '165, 186, 230';
                    btnSolid = ' #1f242e';
                    filledBtnHover = ' #71be7b';
                    red = '#e88989';
                    green = '#89E894';
                    accentInverted = '#76176b';

                    break;

                case 'Sweet Pastel':
                    accent = '164, 204, 232';
                    text = '255, 223, 223';
                    bg = '20, 25, 30';
                    btn = '172, 200, 230';
                    btnSolid = ' #242a32';
                    filledBtnHover = ' #87a8c0';
                    red = '#FAA0A0';
                    green = '#a0faa0';
                    accentInverted = '#5b3317';

                    break;

                case 'Pink':
                    accent = '233, 81, 152';
                    text = '228, 227, 246';
                    bg = '36, 33, 43';
                    btn = '200, 186, 230';
                    btnSolid = ' #34313e';
                    filledBtnHover = ' #ed74ad';
                    red = '#e95151';
                    green = '#51e851';
                    white = '255, 255, 255';

                    break;

                case 'Trollwut Pink':
                    accent = '233, 30, 99';
                    text = '238, 238, 238';
                    bg = '16, 16, 16';
                    btn = '230, 230, 230';
                    btnSolid = ' #252525';
                    filledBtnHover = ' #ed4b82';
                    red = '#e91e28';
                    green = '#1ee96f';
                    white = '255, 255, 255';

                    break;

                case 'Dracula':
                    accent = '189, 147, 249';
                    text = '248, 248, 242';
                    bg = '40, 42, 54';
                    btn = '0, 0, 3';
                    btnOpacity = '0.2';
                    btnHoverOpacity = '0.4';
                    btnSolid = ' #20222c';
                    filledBtnHover = ' #9f7ed2';
                    red = '#ff5555';
                    green = '#50fa7b';
                    accentInverted = '#426c06';

                    break;

                case 'Monokai Pro':
                    accent = '255, 216, 102';
                    text = '252, 252, 250';
                    bg = '45, 42, 46';
                    btn = '0, 0, 0';
                    btnOpacity = '0.25';
                    btnHoverOpacity = '0.5';
                    btnSolid = ' #221f22';
                    filledBtnHover = ' #d5b65b';
                    red = '#ff6188';
                    green = '#a9dc76';
                    accentInverted = '#002799';

                    break;

                case 'Sonokai Espresso':
                    accent = '133, 218, 210';
                    text = '228, 227, 225';
                    bg = '49, 44, 43';
                    btn = '3, 10, 3';
                    btnOpacity = '0.2';
                    btnHoverOpacity = '0.4';
                    btnSolid = ' #282523';
                    filledBtnHover = ' #74b7b1';
                    red = '#fd6883';
                    green = '#adda78';
                    accentInverted = '#7a252d';

                    break;

                case 'Sonokai Shusia':
                    accent = '169, 220, 118';
                    text = '227, 225, 228';
                    bg = '45, 42, 46';
                    btn = '5, 0, 0';
                    btnOpacity = '0.22';
                    btnHoverOpacity = '0.44';
                    btnSolid = ' #242124';
                    filledBtnHover = ' #90b867';
                    red = '#ff6188';
                    green = '#a9dc76';
                    accentInverted = '#562389';

                    break;

                case 'Karma':
                    accent = '252, 229, 102';
                    text = '247, 241, 255';
                    bg = '10, 14, 20';
                    btn = '74, 104, 150';
                    btnSolid = ' #111821';
                    filledBtnHover = ' #ccba54';
                    red = '#fc618d';
                    green = '#7bd88f';
                    accentInverted = '#031a99';

                    break;

                case 'Grey and White':
                    accent = '255, 255, 255';
                    text = '207, 207, 207';
                    bg = '32, 32, 32';
                    btn = '230, 230, 230';
                    btnSolid = ' #343434';
                    filledBtnHover = ' #d2d2d2';
                    red = '#fb7c7c';
                    green = '#6ee1b6';
                    accentInverted = 'black';

                    break;

                case 'Black and Blue':
                    accent = '97, 208, 255';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = ' #4ea6cc';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#9e2f00';

                    break;

                case 'Black and Yellow':
                    accent = '255, 234, 97';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = ' #ccbb4e';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#00159e';

                    break;

                case 'Black and Green':
                    accent = '144, 255, 97';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = ' #73cc4e';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#6f009e';

                    break;

                case 'Black and Pink':
                    accent = '255, 97, 255';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = ' #cc4ecc';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#009e00';

                    break;

                case 'Black and Orange':
                    accent = '255, 171, 97';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = ' #cc894e';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#00549e';

                    break;

                case 'Black and Red':
                    accent = '255, 97, 97';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = ' #cc4e4e';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#009e9e';

                    break;

                case 'Black and Violet':
                    accent = '186, 117, 255';
                    text = '231, 233, 234';
                    bg = '0, 0, 0';
                    btn = '230, 230, 230';
                    btnSolid = ' #171717';
                    filledBtnHover = '#955ecc';
                    red = '#FF6161';
                    green = '#90FF61';
                    accentInverted = '#458a00';

                    break;

                case 'GX Classic':
                    accent = '250, 30, 78';
                    text = '255, 255, 255';
                    bg = '18, 16, 25';
                    btn = '184, 170, 230';
                    btnSolid = ' #231f2d';
                    filledBtnHover = ' #fb4b71';
                    red = '#fa1e1e';
                    green = '#1efa6b';
                    white = '255, 255, 255';

                    break;

                case 'Ultraviolet':
                    accent = '169, 112, 255';
                    text = '255, 255, 255';
                    bg = '14, 12, 29';
                    btn = '142, 129, 230';
                    btnSolid = ' #1b1831';
                    filledBtnHover = ' #ba8dff';
                    red = '#ff7070';
                    green = '#70ff91';
                    white = '255, 255, 255';

                    break;

                case 'Sub Zero':
                    accent = '68, 116, 238';
                    text = '255, 255, 255';
                    bg = '14, 18, 27';
                    btn = '149, 174, 230';
                    btnSolid = ' #1c222f';
                    filledBtnHover = ' #6990f1';
                    red = '#ee4444';
                    green = '#44ee60';
                    white = '255, 255, 255';

                    break;

                case 'Frutti Di Mare':
                    accent = '255, 112, 112';
                    text = '255, 255, 255';
                    bg = '12, 15, 29';
                    btn = '129, 147, 230';
                    btnSolid = ' #181c31';
                    filledBtnHover = ' #ff8d8d';
                    red = '#ff7070';
                    green = '#70ff7a';
                    white = '255, 255, 255';

                    break;

                case 'Purple Haze':
                    accent = '196, 255, 112';
                    text = '255, 255, 255';
                    bg = '19, 7, 34';
                    btn = '161, 90, 230';
                    btnSolid = ' #230f36';
                    filledBtnHover = ' #a1cd61';
                    red = '#ff7070';
                    green = '#c4ff70';
                    black = '0, 0, 0';
                    accentInverted = '#3b008f';

                    break;

                case 'Vaporwave':
                    accent = '71, 255, 231';
                    text = '255, 255, 255';
                    bg = '30, 11, 29';
                    btn = '230, 122, 225';
                    btnSolid = ' #321631';
                    filledBtnHover = ' #3fcebf';
                    red = '#ff476f';
                    green = '#47ffa6';
                    black = '0, 0, 0';
                    accentInverted = '#b80018';

                    break;

                case 'Rose Quartz':
                    accent = '255, 112, 141';
                    text = '255, 255, 255';
                    bg = '29,12,19';
                    btn = '230, 129, 170';
                    btnSolid = ' #311822';
                    filledBtnHover = ' #ff8da4';
                    red = '#ff7070';
                    green = '#70ff81';
                    white = '255, 255, 255';

                    break;

                case 'Coming Soon':
                    accent = '253, 240, 8';
                    text = '255, 255, 255';
                    bg = '0, 36, 41';
                    btn = '46, 205, 230';
                    btnSolid = ' #05353c';
                    filledBtnHover = ' #cac70e';
                    red = '#fd0808';
                    green = '#08fd1c';
                    black = '0, 0, 0';
                    white2 = '255, 255, 255';
                    accentInverted = '#020ff7';

                    break;

                case 'Hackerman':
                    accent = '51, 255, 78';
                    text = '255, 255, 255';
                    bg = '16, 24, 17';
                    btn = '174, 230, 181';
                    btnSolid = ' #202d21';
                    filledBtnHover = ' #2cd141';
                    red = '#ff3333';
                    green = '#33ff4e';
                    black = '0, 0, 0';
                    accentInverted = '#cc00b1';
                    white2 = '255, 255, 255';

                    break;

                case 'Lambda':
                    accent = '255, 153, 0';
                    text = '255, 255, 255';
                    bg = '19, 22, 21';
                    btn = '209, 230, 223';
                    btnSolid = ' #262b2a';
                    filledBtnHover = ' #ffad33';
                    red = '#ff1500';
                    green = '#59ff00';
                    white = '255, 255, 255';

                    break;

                case 'After Eight':
                    accent = '90, 237, 188';
                    text = '255, 255, 255';
                    bg = '23, 20, 18';
                    btn = '230, 209, 195';
                    btnSolid = ' #2c2724';
                    filledBtnHover = ' #4dc29a';
                    red = '#ed5a5a';
                    green = '#5aed69';
                    black = '0, 0, 0';
                    accentInverted = '#a51243';

                    break;

                case 'Pay-To-Win':
                    accent = '222, 183, 104';
                    text = '255, 255, 255';
                    bg = '24, 21, 17';
                    btn = '230, 209, 181';
                    btnSolid = ' #2d2821';
                    filledBtnHover = ' #b79656';
                    red = '#de6868';
                    green = '#6ede68';
                    black = '0, 0, 0';
                    accentInverted = '#214897';

                    break;

                case 'White Wolf':
                    accent = '204, 204, 204';
                    text = '255, 255, 255';
                    bg = '20, 20, 20';
                    btn = '230, 230, 230';
                    btnSolid = ' #292929';
                    filledBtnHover = ' #a7a7a7';
                    red = '#de6868';
                    green = '#6ede68';
                    black = '0, 0, 0';
                    accentInverted = '#333333';
            }
        }

        else if (settings.lightThemes && !document.documentElement.attributes.dark) {
            switch (settings.lightThemes) {
                case 'remedyBright':
                    accent = '235, 104, 75';
                    text = '86, 61, 14';
                    bg = '254, 248, 235';
                    btn = '240, 183, 60';
                    btnOpacity = '0.15';
                    btnHoverOpacity = '0.30';
                    btnSolid = ' #fceed1';
                    filledBtnHover = ' #ef866c';
                    red = '#eb684b';
                    green = '#90eb4b';

                    break;

                case 'noctisHibernus':
                    accent = '0, 153, 173';
                    text = '0, 86, 97';
                    bg = '244, 246, 246';
                    btn = '45, 173, 195';
                    btnSolid = ' #e0eff1';
                    filledBtnHover = ' #31abbb';
                    red = '#ad0000';
                    green = '#00ad3a';

                    break;

                case 'noctisLilac':
                    accent = '112 96 235';
                    text = '12, 0, 107';
                    bg = '242, 241, 248';
                    btn = '45, 25, 215';
                    btnSolid = ' #dedbf5';
                    filledBtnHover = ' #8a7dee';
                    red = '#ad0000';
                    green = '#00ad3a';

                    break;

                case 'noctisLux':
                    accent = '0, 153, 173';
                    text = '0, 86, 97';
                    bg = '254, 248, 236';
                    btn = '120, 100, 20';
                    btnSolid = ' #f0e9d6';
                    filledBtnHover = ' #33acb9';
                    red = '#ad0000';
                    green = '#00ad3a';

                    break;

                case 'catppuccinLatte':
                    accent = '30, 102, 245';
                    text = '76, 79, 105';
                    bg = '239, 241, 245';
                    btn = '25, 25, 25'; // bg rgba subtract 10 from all values, cymk set last value to 90% //
                    btnSolid = ' #dadbdf';
                    filledBtnHover = ' #4882f5';
                    red = '#d20f39';
                    green = '#40a02b';

                    break;

                case 'btCoffeeCream':
                    accent = '211, 105, 76';
                    text = '54, 34, 29';
                    bg = '234, 228, 225';
                    btn = '110, 80, 75';
                    btnSolid = '#ddd5d2';
                    filledBtnHover = '#d88168';
                    red = '#dc2e2e';
                    green = '#4d9900';

                    break;

                case 'btCoffeeMilkshakeBlueberry':
                    accent = '66, 46, 176';
                    text = '7, 6, 12';
                    bg = '218, 217, 235';
                    btn = '53, 50, 125';
                    btnSolid = '#c9c8e0';
                    filledBtnHover = '#6151bd';
                    red = '#d12525';
                    green = '#008b17';

                    break;

                case 'btCoffeeMilkshakeMango':
                    accent = '189, 79, 39';
                    text = '16, 10, 8';
                    bg = '243, 234, 227';
                    btn = '145, 100, 55';
                    btnSolid = '#e9dcd2';
                    filledBtnHover = '#c96e4c';
                    red = '#d12525';
                    green = '#008b17';

                    break;

                case 'btCoffeeMilkshakeMint':
                    accent = '42, 155, 125';
                    text = '0, 0, 0';
                    bg = '237, 243, 238';
                    btn = '73, 125, 85';
                    btnSolid = '#dce7df';
                    filledBtnHover = '#51ae95';
                    red = '#d12525';
                    green = '#008b17';

                    break;

                case 'btCoffeeMilkshakeRaspberry':
                    accent = '209, 23, 79';
                    text = '21, 7, 11';
                    bg = '241, 232, 235';
                    btn = '130, 75, 90';
                    btnSolid = '#e5d8dc';
                    filledBtnHover = '#d6416d';
                    red = '#d12525';
                    green = '#008b17';

                    break;

                case 'btCoffeeMilkshakeVanillaBanana':
                    accent = '147, 116, 22';
                    text = '0, 0, 0';
                    bg = '236, 231, 218';
                    btn = '125, 105, 50';
                    btnSolid = '#e1dac9';
                    filledBtnHover = '#a48a3e';
                    red = '#d12525';
                    green = '#008b17';

                    break;

                case 'gruvbox':
                    accent = '66, 123, 88';
                    text = '60, 56, 54';
                    bg = '251, 241, 199';
                    btn = '25, 24, 20';
                    btnSolid = ' #e4dab5';
                    filledBtnHover = ' #67926e';
                    red = '#9d0006';
                    green = '#79740e';

                    break;

                case 'everforest':
                    accent = '147, 178, 89';
                    text = '92, 106, 114';
                    bg = '253, 246, 227';
                    btn = '25, 25, 23';
                    btnSolid = ' #e6e0ce';
                    filledBtnHover = ' #a9bf74';
                    red = '#f85552';
                    green = '#8da101';

                    break;

                case 'rosePineDawn':
                    accent = '215, 130, 126';
                    text = '87, 82, 121';
                    bg = '250, 244, 237';
                    btn = '25, 25, 24';
                    btnSolid = ' #e4ded7';
                    filledBtnHover = ' #de9994';
                    red = '#b4637a';
                    green = '#56949f';

                    break;

                case 'yaru':
                    accent = '233, 84, 32';
                    text = '61, 61, 61';
                    bg = '255, 255, 255';
                    btn = '25, 25, 25';
                    btnSolid = ' #e8e8e8';
                    filledBtnHover = ' #ed764d';
                    red = '#c7162b';
                    green = '#0e8420';

                    break;

                case 'qogirUbuntu':
                    accent = '251, 132, 65';
                    text = '92, 97, 108';
                    bg = '250, 251, 252';
                    btn = '25, 25, 25';
                    btnSolid = ' #e4e4e5';
                    filledBtnHover = ' #fb9c66';
                    red = '#FC4138';
                    green = '#73d216';

                    break;

                case 'nord':
                    accent = '94, 129, 172';
                    text = '13, 18, 28';
                    bg = '236, 239, 244';
                    btn = '25, 25, 25';
                    btnSolid = ' #d7dade';
                    filledBtnHover = ' #7a97bb';
                    red = '#a0252b';
                    green = '#3b6e43';

                    break;

                case 'snes':
                    accent = '79, 67, 174';
                    text = '11, 8, 10';
                    bg = '206, 201, 204';
                    btn = '25, 25, 24';
                    btnSolid = ' #bcb8b9';
                    filledBtnHover = ' #685eb4';
                    red = '#D14D41';
                    green = '#879A39';

                    break;

                case 'solarized':
                    accent = '38, 139, 210';
                    text = '0, 26, 34';
                    bg = '253, 246, 227';
                    btn = '25, 25, 23';
                    btnSolid = ' #e6e0ce';
                    filledBtnHover = ' #51a0d5';
                    red = '#dc322f';
                    green = '#859900';

                    break;

                case 'flexoki':
                    accent = '36, 131, 123';
                    text = '35, 34, 34';
                    bg = '242, 240, 229';
                    btn = '25, 25, 24';
                    btnSolid = ' #dcdbd0';
                    filledBtnHover = ' #4d9990';
                    red = '#D14D41';
                    green = '#879A39';

                    break;

                case 'monokaiPro':
                    accent = '225, 71, 117';
                    text = '41, 36, 42';
                    bg = '250, 244, 242';
                    btn = '115, 113, 113';
                    btnSolid = ' #ede7e5';
                    filledBtnHover = ' #e66a8e';
                    red = '#e14775';
                    green = '#269d69';

                    break;

                case 'blue':
                    accent = '41, 66, 255';
                    text = '10, 16, 64';
                    bg = '242, 243, 255';
                    btn = '24, 24, 25';
                    btnSolid = ' #dbdce8';
                    filledBtnHover = ' #4f63ff';
                    red = '#ff2929';
                    green = '#21cc31';

                    break;

                case 'violet':
                    accent = '137, 41, 255';
                    text = '34, 10, 64';
                    bg = '248, 242, 255';
                    btn = '25, 24, 25';
                    btnSolid = ' #e2dbe8';
                    filledBtnHover = ' #9e52ff';
                    red = '#ff2929';
                    green = '#21cc31';

                    break;

                case 'green':
                    accent = '33, 204, 49';
                    text = '10, 64, 15';
                    bg = '242, 255, 245';
                    btn = '24, 25, 24';
                    btnSolid = ' #dbe8de';
                    filledBtnHover = ' #4ad45a';
                    red = '#ff2929';
                    green = '#21cc31';

                    break;

                case 'pink':
                    accent = '255, 41, 116';
                    text = '64, 10, 29';
                    bg = '255, 242, 247';
                    btn = '24, 24, 25';
                    btnSolid = ' #e7dbe1';
                    filledBtnHover = ' #fc5290';
                    red = '#ff2929';
                    green = '#21cc31';

                    break;

                case 'orange':
                    accent = '255, 95, 41';
                    text = '64, 24, 10';
                    bg = '255, 245, 242';
                    btn = '25, 24, 24';
                    btnSolid = ' #e8dedb';
                    filledBtnHover = ' #fc7d54';
                    red = '#ff2929';
                    green = '#21cc31';

                    break;

                case 'red':
                    accent = '255, 41, 41';
                    text = '64, 10, 10';
                    bg = '255, 242, 242';
                    btn = '25, 24, 24';
                    btnSolid = ' #e8dbdb';
                    filledBtnHover = ' #fc5254';
                    red = '#ff2929';
                    green = '#21cc31';
            }
        }

        ytTweaks.sheet.textContent += `
        html,
        html[dark],
        html [dark],
        [color-version=v2_0] [dark], 
        html[color-version=v2_0][dark] {
          --yt-spec-text-primary: rgb(${text}) !important;
          --yt-spec-touch-response: rgb(${text}) !important;
          --yt-spec-touch-response-inverse: currentcolor !important;
          --yt-spec-base-background: rgb(${bg}) !important;
          --yt-spec-raised-background: rgb(${bg}) !important;
          --yt-frosted-glass-desktop: rgb(${bg}) !important;
          --yt-spec-frosted-glass-desktop: rgb(${bg}) !important;
          --yt-spec-additive-background: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-spec-badge-chip-background: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-spec-outline: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-spec-outline-opaque: var(--yt-spec-outline) !important;
          --yt-spec-outline-inverse-opaque: rgb(${accent}) !important;
          --yt-spec-10-percent-layer: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-spec-text-secondary: rgba(${text}, 0.68) !important;
          --yt-spec-button-chip-background-hover: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-spec-icon-disabled: rgba(${text}, 0.38) !important;
          --yt-spec-suggested-action: rgba(${accent}, 0.30) !important;
          --yt-spec-suggested-action-inverse: rgba(${black || white || bg}, 0.2) !important;
          --yt-spec-static-overlay-touch-response-inverse: currentcolor !important;
          --yt-spec-static-overlay-background-brand: ${red} !important;
          --yt-spec-static-brand-red: rgb(${accent}) !important;
          --yt-spec-commerce-filled-hover: ${filledBtnHover} !important;
          --yt-spec-mono-tonal-hover: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-spec-text-disabled: rgba(${text}, 0.38) !important;
          --yt-spec-wordmark-text: rgb(${text}) !important;
          --yt-spec-brand-icon-active: rgb(${text}) !important;
          --yt-spec-icon-active-other: rgb(${text}) !important;
          --yt-spec-call-to-action: rgb(${accent}) !important;
          --yt-spec-call-to-action-inverse: rgb(${black || white || bg}) !important;
          --yt-spec-call-to-action-faded: rgba(${accent}, 0.30) !important;
          --yt-spec-themed-blue: rgb(${accent}) !important;
          --yt-spec-themed-green: ${green} !important;
          --yt-spec-menu-background: ${btnSolid} !important;
          --yt-spec-brand-background-primary: rgb(${bg}) !important;
          --yt-spec-general-background-a: rgb(${bg}) !important;
          --yt-spec-general-background-b: rgb(${bg}) !important;
          --yt-spec-general-background-c: rgb(${bg}) !important;
          --yt-spec-static-brand-black: rgb(${bg}) !important;
          --yt-spec-static-overlay-call-to-action: currentcolor !important;
          --yt-spec-dark-blue: rgb(${accent}) !important;
          --yt-spec-light-blue: rgb(${accent}) !important;
          --yt-spec-grey-5: rgba(${text}, 0.38) !important;
          --yt-spec-brand-background-solid: rgb(${bg}) !important;
          --yt-emoji-picker-search-background-color: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-emoji-picker-search-color: rgb(${text}) !important;
          --yt-emoji-picker-search-placeholder-color: rgba(${text}, 0.68) !important;
          --yt-live-chat-primary-text-color: rgb(${text}) !important;
          --yt-live-chat-secondary-text-color: rgba(${text}, 0.68) !important;
          --yt-live-chat-secondary-background-color:  rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-live-chat-text-input-field-inactive-underline-color: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-live-chat-tertiary-text-color: rgba(${text}, 0.68) !important;
          --yt-live-chat-vem-background-color: ${btnSolid} !important;
          --yt-live-chat-background-color: rgb(${bg}) !important;
          --yt-live-chat-banner-gradient-scrim: linear-gradient(rgb(${bg}), transparent) !important;
          --yt-live-chat-action-panel-gradient-scrim: linear-gradient(to top, rgb(${bg}), transparent) !important;
          --yt-live-chat-toast-background-color: rgb(${accent}) !important;
          --yt-live-chat-toast-action-color: rgb(${black || white || bg}) !important;
          --yt-live-chat-toast-text-color: rgb(${black || white || bg}) !important;
          --yt-live-chat-product-picker-hover-color: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-live-chat-sub-panel-background-color-transparent: rgb(${bg}) !important;
          --yt-live-chat-action-panel-background-color: rgb(${bg}) !important;
          --yt-live-chat-action-panel-background-color-transparent: rgb(${bg}) !important;
          --yt-live-chat-dialog-background-color: rgb(${bg}) !important;
          --yt-live-chat-author-chip-verified-background-color: rgb(${accent}) !important;
          --yt-live-chat-author-chip-verified-text-color: rgb(${black || white || bg}) !important;
          --yt-live-chat-dialog-text-color: rgb(${text}) !important;
          --yt-live-chat-header-background-color: rgb(${bg}) !important;
          --yt-live-chat-slider-active-color: rgb(${accent}) !important;
          --yt-live-chat-slider-container-color: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-live-chat-sponsor-color: ${green} !important;
          --yt-live-chat-moderator-color: rgb(${accent}) !important;
          --yt-live-chat-slider-markers-color: rgb(${text}) !important;
          --yt-live-chat-shimmer-linear-gradient: linear-gradient(0deg, rgba(0, 0, 0, .1) 40%, rgba(${btn}, ${btnOpacity || '0.10'}), rgba(0, 0, 0, 0.1) 60%) !important;
          --yt-live-chat-deleted-message-color: rgba(${text}, 0.68) !important;
          --yt-live-chat-shimmer-background-color: rgba(0, 0, 0, 0.3) !important;
          --yt-live-chat-overlay-color: rgba(0, 0, 0, 0.3) !important;
          --yt-live-chat-button-dark-text-color: rgb(${text}) !important;
          --yt-live-chat-mode-change-background-color:  rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-live-chat-text-input-field-placeholder-color: rgba(${text}, 0.68) !important;
          --yt-compact-link-icon-color: rgb(${text}) !important;
          --yt-deprecated-blue: rgb(${accent}) !important;
          --paper-radio-button-checked-color: rgb(${accent}) !important;
          --paper-radio-button-checked-ink-color: rgb(${accent}) !important;
          --paper-radio-button-unchecked-color: rgb(${text}) !important;
          --paper-radio-button-unchecked-ink-color: rgb(${text}) !important;
          --paper-toggle-button-checked-bar-color: rgb(${accent}) !important;
          --paper-toggle-button-unchecked-bar-color: rgb(${text}) !important;
          --paper-toggle-button-checked-button-color: rgb(${accent}) !important;
          --paper-toggle-button-checked-ink-color: rgb(${accent}) !important;
          --paper-toggle-button-unchecked-button-color: rgb(${text}) !important;
          --paper-toggle-button-unchecked-bar-opacity: 0.38 !important;
          --paper-toggle-button-checked-bar-opacity: 0.38 !important;
          --paper-checkbox-checked-color: rgb(${accent}) !important;
          --paper-checkbox-checked-ink-color: rgb(${accent}) !important;
          --paper-checkbox-unchecked-color: rgb(${text}) !important;
          --paper-checkbox-unchecked-ink-color: rgb(${text}) !important;
          --paper-tooltip-background: rgb(${accent}) !important;
          --yt-spec-commerce-badge-background: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-spec-commerce-tonal-hover: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-spec-brand-button-background: ${red} !important;
          --divider-color: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-spec-brand-link-text: ${red} !important;
          --yt-spec-static-grey: rgba(${white || black || bg}, 0.2) !important;
          --yt-deprecated-white-opacity-lighten-4: rgba(${btn}, ${btnOpacity || '0.10'}) !important;

          --yt-sys-color-baseline--text-primary: rgb(${text}) !important;
          --yt-sys-color-baseline--touch-response: rgb(${text}) !important;
          --yt-sys-color-baseline--touch-response-inverse: currentcolor !important;
          --yt-sys-color-baseline--base-background: rgb(${bg}) !important;
          --yt-sys-color-baseline--raised-background: rgb(${bg}) !important;
          --yt-sys-color-baseline--frosted-glass-desktop: rgb(${bg}) !important;
          --yt-sys-color-baseline--additive-background: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-sys-color-baseline--badge-chip-background: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-sys-color-baseline--outline: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-sys-color-baseline--outline-opaque: var(--yt-sys-color-baseline--outline) !important;
          --yt-sys-color-baseline--outline-inverse-opaque: rgb(${accent}) !important;
          --yt-sys-color-baseline--10-percent-layer: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-sys-color-baseline--text-secondary: rgba(${text}, 0.68) !important;
          --yt-sys-color-baseline--button-chip-background-hover: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-sys-color-baseline--icon-disabled: rgba(${text}, 0.38) !important;
          --yt-sys-color-baseline--suggested-action: rgba(${accent}, 0.30) !important;
          --yt-sys-color-baseline--suggested-action-inverse: rgba(${black || white || bg}, 0.2) !important;
          --yt-sys-color-baseline--static-overlay-touch-response-inverse: currentcolor !important;
          --yt-sys-color-baseline--static-overlay-background-brand: ${red} !important;
          --yt-sys-color-baseline--static-brand-red: rgb(${accent}) !important;
          --yt-sys-color-baseline--commerce-filled-hover: ${filledBtnHover} !important;
          --yt-sys-color-baseline--mono-tonal-hover: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-sys-color-baseline--text-disabled: rgba(${text}, 0.38) !important;
          --yt-sys-color-baseline--wordmark-text: rgb(${text}) !important;
          --yt-sys-color-baseline--brand-icon-active: rgb(${text}) !important;
          --yt-sys-color-baseline--icon-active-other: rgb(${text}) !important;
          --yt-sys-color-baseline--call-to-action: rgb(${accent}) !important;
          --yt-sys-color-baseline--call-to-action-inverse: rgb(${black || white || bg}) !important;
          --yt-sys-color-baseline--call-to-action-faded: rgba(${accent}, 0.30) !important;
          --yt-sys-color-baseline--themed-blue: rgb(${accent}) !important;
          --yt-sys-color-baseline--themed-green: ${green} !important;
          --yt-sys-color-baseline--menu-background: ${btnSolid} !important;
          --yt-sys-color-baseline--brand-background-primary: rgb(${bg}) !important;
          --yt-sys-color-baseline--general-background-a: rgb(${bg}) !important;
          --yt-sys-color-baseline--general-background-b: rgb(${bg}) !important;
          --yt-sys-color-baseline--general-background-c: rgb(${bg}) !important;
          --yt-sys-color-baseline--static-brand-black: rgb(${bg}) !important;
          --yt-sys-color-baseline--static-overlay-call-to-action: currentcolor !important;
          --yt-sys-color-baseline--dark-blue: rgb(${accent}) !important;
          --yt-sys-color-baseline--light-blue: rgb(${accent}) !important;
          --yt-sys-color-baseline--grey-5: rgba(${text}, 0.38) !important;
          --yt-sys-color-baseline--brand-background-solid: rgb(${bg}) !important;
          --yt-sys-color-baseline--commerce-badge-background: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --yt-sys-color-baseline--commerce-tonal-hover: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --yt-sys-color-baseline--brand-button-background: ${red} !important;
          --yt-sys-color-baseline--brand-link-text: ${red} !important;
          --yt-sys-color-baseline--error-indicator: ${red} !important;
          --yt-sys-color-baseline--static-grey: rgba(${white || black || bg}, 0.2) !important;

          --ta889dfda9605a358: rgb(${bg}) !important;
          --t3e41d7b17b187f69: rgb(${bg}) !important;
          --tffc2fd3a644f6275: rgb(${text}) !important;
          --t4a6da19e16bf221a: rgba(${text}, 0.68) !important;
          --t7e34d5baa4ea6277: rgba(${text}, 0.38) !important;
          --tb628117fc164ad87: rgb(${black || white || bg}) !important;
          --t6216186c28b3834b: rgb(${black || white || bg}) !important;
          --t2d807bb79e75606d: rgb(${accent}) !important;
          --tfa3475c508f5dfef: rgba(${accent}, 0.30) !important;
          --t904a88c623ca27ab: ${green} !important;
          --t518e925f61bdcb91: ${btnSolid} !important;
          --t08a7c6c176cbc5c2: ${btnSolid} !important;
          --tf3fc855af2285f5f: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --t7f4f2c6d54836ce0: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          --td8562cdc203bc683: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --t416e5931fc464589: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
          --t7d8b8e5ee291aec0: rgba(${white || black || bg}, 0.10) !important;
          --tb7d74bb3291c951d: rgba(${white || black || bg}, 0.20) !important;
          --t441a0e44e495381a: rgba(${white || black || bg}, 0.20) !important;
          --t20480717de80f555: rgba(${white || black || bg}, 0.20) !important;
        }
  
        html,
        html[dark] {
          background-color: rgb(${bg}) !important;
        }
  
        html[darker-dark-theme],
        html[darker-dark-theme] [dark] {
          --yt-spec-text-primary: rgb(${text}) !important;
          --yt-spec-text-primary-inverse: rgb(${black || white || bg}) !important;

          --yt-sys-color-baseline--text-primary: rgb(${text}) !important;
          --yt-sys-color-baseline--text-primary-inverse: rgb(${black || white || bg}) !important;
        }
  
        html[system-icons],
        html[system-icons] [dark] {
          --yt-spec-icon-disabled: rgba(${text}, 0.38) !important;
          --yt-spec-brand-icon-inactive: rgb(${text}) !important;
          --yt-spec-icon-inactive: rgb(${text}) !important;

          --yt-sys-color-baseline--icon-disabled: rgba(${text}, 0.38) !important;
          --yt-sys-color-baseline--brand-icon-inactive: rgb(${text}) !important;
          --yt-sys-color-baseline--icon-inactive: rgb(${text}) !important;
        }
  
        ::selection {
          color: rgb(${black || white || bg}) !important;
          background: rgb(${accent}) !important;
        }
  
        /* Tooltip (Old) */
        .tp-yt-paper-tooltip[style-target=tooltip],
        /* Tooltip (New) */
        .ytTooltipContainerDefaultTooltipContent {
          color: rgb(${black || white || bg});
        }

        /* Tooltip (New) */
        .ytTooltipContainerDefaultTooltipContent {
          background: rgb(${accent});
        }
  
        /* Input fields */
        ytd-masthead ::-webkit-input-placeholder {
          color: rgba(${text}, 0.68) !important;
        }
  
        ytd-searchbox[has-focus] #container.ytd-searchbox {
          border: none;
          box-shadow: none;
        }
  
        .focused-line.tp-yt-paper-input-container {
          border-color: rgb(${accent});
        }
  
        .ytStandardsTextareaShapeTextAreaOutline {
          border-color: rgba(${btn}, ${btnHoverOpacity || '0.20'});
        }
  
        .ytStandardsTextareaShapeLabel {
          color: rgba(${text}, 0.68);
        }
  
        .ytStandardsTextareaShapeTextArea {
          color: rgb(${text});
        }
  
        /* Dropdown menu */
        ytd-dropdown-renderer {
          --paper-dropdown-menu-focus-color: rgb(${accent});
        }
  
        .ytContextualSheetLayoutHost {
          background: ${btnSolid};
        }
  
        .yt-list-item-view-model__container--tappable:hover {
          background: rgba(${btn}, ${btnHoverOpacity || '0.20'});
        }
  
        .yt-list-item-view-model__title {
          color: rgb(${text});
        }

        /* Dropdown menu > Header > Title */
        .ytPanelHeaderViewModelTitle,
        /* Dropdown menu button > Arrow icon */
        .ytDropdownViewModelChevronDown {
          color: rgb(${text});
        }

        /* Dropdown menu > Header > Separator */
        .ytPanelHeaderViewModelHost {
          border-color: rgba(${btn}, ${btnHoverOpacity || '0.20'});
        }
  
        /* Search box */
        .ytSearchboxComponentInputBox,
        .ytSearchboxComponentSearchButton {
          background:  rgba(${btn}, ${btnOpacity || '0.10'}) !important;
          border-color: transparent !important;
          color: rgb(${text}) !important;
          box-shadow: none !important;
        }
  
        .ytSearchboxComponentClearButtonIcon {
          color: rgb(${text}) !important;
        }
  
        .ytSearchboxComponentClearButton:hover {
          background: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
        }
  
        /* Search suggestions box */
        .ytSearchboxComponentSuggestionsContainer {
          background: ${btnSolid} !important;
          border: 0 !important;
        }
  
        .ytSuggestionComponentSuggestion,
        .ytSuggestionComponentPersonalizedSuggestion {
          color: rgb(${text}) !important;
        }
  
        .ytSuggestionComponentRemoveLink {
          color: rgb(${accent}) !important;
        }

        .ytSuggestionComponentNewVideoIcon {
          background-color: rgb(${accent}) !important;
        }
  
        .ytSuggestionComponentHighlighted,
        .ytSuggestionComponentSuggestion:hover {
          background: rgba(${btn}, ${btnHoverOpacity || '0.20'}) !important;
        }
  
        .ytSuggestionComponentNewVideoText,
        .ytSearchboxComponentReportButton,
        .ytSuggestionComponentRemovedText,
        .ytSuggestionComponentEntitySubtitle {
          color: rgba(${text}, 0.68) !important;
        }

        .ytSearchboxComponentSuggestionsContainerFooterGradient {
          background: linear-gradient(to bottom, transparent, ${btnSolid}) !important;
        }
  
        /* Buttons */      
        .ytSpecButtonShapeNextMono.ytSpecButtonShapeNextFilled,
        .ytSpecButtonShapeNextOverlay.ytSpecButtonShapeNextFilled,
        .ytSpecButtonShapeNextCallToAction.ytSpecButtonShapeNextFilled {
          background: rgb(${accent});
          color: rgb(${black || white || bg});
        }
  
        .ytSpecButtonShapeNextMono.ytSpecButtonShapeNextFilled:hover,
        .ytSpecButtonShapeNextOverlay.ytSpecButtonShapeNextFilled:hover,
        .ytSpecButtonShapeNextCallToAction.ytSpecButtonShapeNextFilled:hover {
          background: ${filledBtnHover};
        }

        /* Buttons > Header > Buttons of type 'Overlay' */
        #masthead .ytSpecButtonShapeNextOverlay.ytSpecButtonShapeNextTonal {
          background: rgba(${btn}, ${btnOpacity || '0.10'});
          color: rgba(${text});
        }

        #masthead .ytSpecButtonShapeNextOverlay.ytSpecButtonShapeNextTonal:hover {
          background: rgba(${btn}, ${btnHoverOpacity || '0.20'});
        }

        #masthead .ytSpecButtonShapeNextOverlay.ytSpecButtonShapeNextText {
          color: rgba(${text});
        }
  
        /* Buttons > Tabs */
        yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT][selected] #chip-container.yt-chip-cloud-chip-renderer, 
        yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER][selected] #chip-container.yt-chip-cloud-chip-renderer,
        .ytChipShapeActive {
          background: rgb(${accent});
          color: rgb(${black || white || bg});
        }
  
        .ytTabShapeTabSelected,
        .ytTabShapeHost:focus .ytTabShapeTab {
          color: rgb(${accent});
        }

        .tabGroupShapeSlider {
          background: rgb(${accent});
        }

        /* Buttons > Live chat > Arrow down button */
        yt-icon-button.yt-live-chat-item-list-renderer {
          background: rgb(${accent});
          color: rgb(${black || white || bg});
        }
  
        /* Hyperlinks */
        :is([style*="color: rgb(62, 166, 255);"], [style*="color: rgb(6, 95, 212);"]) {
          color: rgb(${accent}) !important;
        }
  
        /* Badges/icons */
        .badge-style-type-live-now-alternate.ytd-badge-supported-renderer yt-icon,
        .badge-style-type-live-now-alternate.ytd-badge-supported-renderer,
        ytd-thumbnail-overlay-time-status-renderer[overlay-style=LIVE] #time-status.ytd-thumbnail-overlay-time-status-renderer,
        .ytSpecAvatarShapeLiveBadgeText {
          color: rgb(${white || white2 || black || bg}) !important;
        }
  
        .yt-badge-shape--default {
          color: rgba(${text}, 0.68);
          background: rgba(${btn}, ${btnOpacity || '0.10'});
        }

        .yt-badge-shape--default.yt-badge-shape--modern {
          color: rgba(${text}, 0.68);
        }
  
        .yt-badge-shape--membership,
        .yt-badge-shape--commerce {
          color: ${green};
          background: rgba(${btn}, ${btnOpacity || '0.10'});
        }
  
        .badge-style-type-live-now-alternate.ytd-badge-supported-renderer,
        .ytSpecIconBadgeShapeTypeNotification .ytSpecIconBadgeShapeBadge,
        .ytp-videowall-still-info-live,
        .ytp-live-badge[disabled]:before,
        .ytBadgeShapeLive,
        .ytBadgeShapeThumbnailLive,
        .ytSpecAvatarShapeLiveBadge {
          background: ${red} !important;
          color: rgba(${white || white2 || black || bg}) !important;
          border: none !important;
        }
  
        .ytSpecAvatarShapeLiveRing:after {
          background: ${red};
        }
  
        .guide-entry-badge.ytd-guide-entry-renderer {
          color: ${red};
        }
  
        .ytSpecIconBadgeShapeStyleOverlay .ytSpecIconBadgeShapeIcon,
        .yt-spec-icon-badge-shape,
        .yt-spec-profile-page-header-information-view-model-shape__profile-page-header-title,
        .yt-badge-shape--promoted,
        yt-icon.ytd-logo {
          color: rgb(${text});
        }
  
        ytd-topbar-logo-renderer [fill^="#FF0"],
        ytd-guide-entry-renderer [fill*=F00],
        ytd-guide-entry-renderer [fill=red],
        .ytSpecIconShapeHost [fill="#f03"],
        #icon.yt-live-chat-viewer-engagement-message-renderer [fill*=F00],
        .ytp-cued-thumbnail-overlay:hover .ytp-large-play-button-bg,
        ytd-compact-link-renderer [fill="#CC0000"],
        ytd-badge-supported-renderer [fill="#CC0000"] {
          fill: rgb(${accent});
        }
  
        ytd-topbar-logo-renderer [fill=white],
        ytd-guide-entry-renderer [fill="#FAFAFA"],
        ytd-guide-entry-renderer [fill="#FFFFFF"],
        .ytSpecIconShapeHost [fill*="#fff"],
        #icon.yt-live-chat-viewer-engagement-message-renderer [fill="#FFFFFF"],
        .ytp-cued-thumbnail-overlay:hover [d*="M 45"],
        ytd-compact-link-renderer [fill="#FFF"],
        ytd-badge-supported-renderer [fill="#FFF"] {
          fill: rgb(${black || white || bg});
        }

        /* Badges/icons > Bell icon (Personalized) in subscribe button */
        [d=" M10,19 C10,20.104999542236328 10.895000457763672,21 12,21 C13.104999542236328,21 14,20.104999542236328 14,19 C14,19 10,19 10,19z M16,19 C16,21.208999633789062 14.208999633789062,23 12,23 C9.791000366210938,23 8,21.208999633789062 8,19 C8,19 16,19 16,19z"],
        [d=" M12,3 C9.23900032043457,3 7,5.238999843597412 7,8 C7,8 7,12.446000099182129 7,12.446000099182129 C7,12.989999771118164 6.8520002365112305,13.52400016784668 6.572000026702881,13.989999771118164 C6.572000026702881,13.989999771118164 4.765999794006348,17 4.765999794006348,17 C4.765999794006348,17 19.232999801635742,17 19.232999801635742,17 C19.232999801635742,17 17.42799949645996,13.98900032043457 17.42799949645996,13.98900032043457 C17.148000717163086,13.52299976348877 17,12.989999771118164 17,12.446000099182129 C17,12.446000099182129 17,8 17,8 C17,5.238999843597412 14.76099967956543,3 12,3z M12,1 C15.866000175476074,1 19,4.133999824523926 19,8 C19,8 19,12.446000099182129 19,12.446000099182129 C19,12.626999855041504 19.049999237060547,12.805999755859375 19.14299964904785,12.961000442504883 C19.14299964904785,12.961000442504883 20.947999954223633,15.972000122070312 20.947999954223633,15.972000122070312 C21.74799919128418,17.30500030517578 20.788000106811523,19 19.232999801635742,19 C19.232999801635742,19 4.765999794006348,19 4.765999794006348,19 C3.2119998931884766,19 2.252000093460083,17.30500030517578 3.0510001182556152,15.972000122070312 C3.0510001182556152,15.972000122070312 4.85699987411499,12.961000442504883 4.85699987411499,12.961000442504883 C4.949999809265137,12.805999755859375 5,12.626999855041504 5,12.446000099182129 C5,12.446000099182129 5,8 5,8 C5,4.133999824523926 8.133999824523926,1 12,1z"] {
            fill: rgb(${text}) !important;
        }
  
        /* Pop-up notification */
        yt-notification-action-renderer tp-yt-paper-toast.yt-notification-action-renderer {
          background: rgb(${accent});
        }
  
        yt-notification-action-renderer #text.yt-notification-action-renderer,
        yt-notification-action-renderer #sub-text.yt-notification-action-renderer {
          color: rgb(${black || white || bg});
        }

        /* Pop-up notification (Saved to playlist) */
        .snackbarViewModelHost {
          background: rgb(${accent});
        }
  
        /* Skeletons */
        .watch-skeleton .skeleton-bg-color,
        #home-page-skeleton .skeleton-bg-color,
        .masthead-skeleton-icon,
        .ytGhostCommentsCircle, /* Shorts Page: Comments skeleton (Avatar) */
        .ytGhostCommentsGhostFill /* Shorts Page: Comments skeleton (Text) */ {
          background:  rgba(${btn}, ${btnOpacity || '0.10'}) !important;
        }
  
        #home-container-skeleton,
        #home-page-skeleton #guide-skeleton,
        #home-chips {
          background: rgb(${bg}) !important;
          border-color: rgba(${btn}, ${btnOpacity || '0.10'}) !important;
        }
  
        #masthead.shell,
        ytd-masthead.shell.theater {
          background: rgb(${bg}) !important;
        }
  
        .watch-skeleton .skeleton-light-border-bottom {
          border-color:  rgba(${btn}, ${btnOpacity || '0.10'}) !important;
        }
  
        /* Channel page */
        .yt-page-header-view-model__page-header-title,
        .yt-page-header-view-model__page-header-attribution,
        .yt-truncated-text__absolute-button {
          color: rgb(${text});
        }

        .yt-page-header-view-model__page-header-content-metadata,
        .yt-truncated-text {
          color: rgba(${text}, 0.68) !important;
        }
  
        /* Text */
        .yt-shelf-header-layout__title,
        .ytd-brand-video-shelf-renderer:is(#title-container, #subtitle-container),
        .ytAttributedStringLinkInheritColor:is([style*="color: rgb(255, 255, 255);"], [style*="color: rgb(19, 19, 19);"]),
        .ytd-menu-title-renderer,
        .page-header-view-model__page-header-title,
        .yt-video-attribute-view-model__title,
        .yt-video-attributes-section-view-model__title,
        .yt-lockup-metadata-view-model__title,
        .ytwFactoidRendererValue,
        .yt-radio-shape__label-container,
        .truncated-text__absolute-button,
        .yt-list-item-view-model__accessory,
        .ytwFactoidRendererValue {
          color: rgb(${text}) !important;
        }

        ytd-reel-video-renderer .ytAttributedStringLinkInheritColor[style*="color: rgb(255, 255, 255);"] {
          color: inherit !important;
        }

        .page-header-view-model__page-header-content-metadata,
        .yt-video-attribute-view-model__subtitle,
        .yt-video-attributes-section-view-model__subtitle,
        .yt-video-attribute-view-model__secondary-subtitle,
        .yt-lockup-metadata-view-model__metadata,
        .ytwFactoidRendererLabel,
        .truncated-text,
        :is(.yt-simple-endpoint, .ytAttributedStringLinkInheritColor):is([style*="color: rgb(170, 170, 170);"], [style*="color: rgb(96, 96, 96);"]),
        .ytwFactoidRendererLabel {
          color: rgba(${text}, 0.68) !important;
        }
  
        /* Page loading bar */
        #progress.yt-page-navigation-progress {
          background: rgb(${accent}) !important;
        }

        /* Horizontal scrolling list > Gradient */
        .ytChipsShelfViewModelGradientButton .ytChipsShelfViewModelLeftArrowContainer::after {
            background: linear-gradient(to left, rgba(${bg}, 0) 0, rgba(${bg}, 0.3) 25%, rgba(${bg}, 0.6) 50%, rgba(${bg}, 0.9) 75%, rgb(${bg}) 100%);
        }

        .ytChipsShelfViewModelGradientButton .ytChipsShelfViewModelRightArrowContainer::before {
            background: linear-gradient(to right, rgba(${bg}, 0) 0, rgba(${bg}, 0.3) 25%, rgba(${bg}, 0.6) 50%, rgba(${bg}, 0.9) 75%, rgb(${bg}) 100%);
        }
  
        /* Dialogs > Report dialog */
        .ytWebReportFormReasonSelectPageViewModelHeaderDialog,
        .ytWebReportFormReasonSelectPageViewModelBody {
          color: rgb(${text});
        }
  
        /* Dialogs > Other */
        .yt-spec-dialog-layout__dialog-layout-content,
        .ytDialogHeaderViewModelText,
        .ytBasicContentViewModelParagraphText,
        .ytDropdownViewModelTitle,
        .yt-panel-header-view-model__title,
        .ytStandardsTextareaShapeTextarea {
          color: rgb(${text});
        }
  
        .ytStandardsTextareaShapePlaceholder,
        .ytDropdownViewModelLabel,
        .yt-list-item-view-model__subtitle {
          color: rgba(${text}, 0.68);
        }
  
        .ytStandardsTextareaShapeTextareaContainerOutline,
        .ytDropdownViewModelDropdownContainer,
        .yt-panel-header-view-model { 
          border-color: rgba(${btn}, ${btnHoverOpacity || '0.20'});
        }
  
        .ytStandardsTextareaShapeTextareaContainerOutline:focus-within {
          border-color: rgb(${accent});
        }
  
        .yt-spec-dialog-layout {
          background: rgb(${bg});
        }
  
        .ytStandardsTextareaShapeHint, 
        .ytStandardsTextareaShapeError,
        .ytDropdownViewModelError {
          color: ${red};
        }
            
        .ytDropdownViewModelDropdownContainerErrorBorder {
          border-color: ${red};
        }
  
        /* Toggle switch */
        .ytSwitchShapeTrack {
          background: rgba(${btn}, ${btnHoverOpacity || '0.20'});
        }
  
        .ytSwitchShapeTrackActive {
          background: rgb(${accent});
        }
  
        .ytSwitchShapeKnob {
          background: rgb(${black || white || bg});
        }

        /* Player > controls */
        .ytp-play-progress,
        .ytp-scrubber-button,
        #progress.ytd-thumbnail-overlay-resume-playback-renderer,
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment,
        .ytp-chrome-controls .ytp-button[aria-pressed]:after,
        .ytp-slider-handle,
        .ytp-slider-handle:before,
        .ytProgressBarLineProgressBarPlayed,
        .ytProgressBarPlayheadProgressBarPlayheadDot,
        .PlayerControlsProgressBarHostProgressBarPlayed,
        .PlayerControlsProgressBarHostProgressBarPlayheadDot {
          background: rgb(${accent}) !important;
        }

        /* Player > Miniplayer */
        .ytdMiniplayerInfoBarHost {
          background: ${btnSolid};
        }

        .ytdMiniplayerInfoBarTitle {
          color: rgb(${text});
        }

        .ytdMiniplayerInfoBarSubtitle {
          color: rgba(${text}, 0.68);
        }
  
        /* Watch page > Player > Settings menu / Right-click context menu */
        .ytp-panel-footer-content-link {
          color: rgb(${accent}) !important;
        }

        .ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox:after {
          background: rgb(${accent});
        }
  
        .ytp-settings-menu .ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {
          background: rgba(${accent}, 0.38);
        }
  
        /* Watch page > Player > Ambient mode */
        #cinematics.ytd-watch-flexy,
        #shorts-cinematic-container {
          display: none;
        }

        /* Watch page > Player > Quality badges */
        .ytp-settings-button.ytp-hd-quality-badge:after,
        .ytp-settings-button.ytp-hdr-quality-badge:after,
        .ytp-settings-button.ytp-4k-quality-badge:after,
        .ytp-settings-button.ytp-5k-quality-badge:after,
        .ytp-settings-button.ytp-8k-quality-badge:after,
        .ytp-settings-button.ytp-3d-badge-grey:after,
        .ytp-settings-button.ytp-3d-badge:after {
          background-color: ${accentInverted || `rgb(${accent})`} !important;
          ${accentInverted ? 'filter: invert(100%)' : ''}
        }
  
        /* Watch page > Like/Dislike icons */
        segmented-like-dislike-button-view-model path {
          fill: rgb(${text});
        }
  
        /* Watch page > Live chat replay box / AI video sumary */
        /* Live chat replay box */
        .ytCarouselTitleViewModelTitle,
        .ytTextCarouselItemViewModelHost,
        /* AI video sumary */
        .videoSummaryContentViewModelHost,
        .ytGenAiFeedbackFormViewModelTitle {
          color: rgb(${text});
        }
  
        .ytVideoMetadataCarouselViewModelHost {
          background: rgba(${btn}, ${btnOpacity || '0.10'});
        }

        /* Watch page > Live chat */
        #live-chat-dialog-body .bold.yt-formatted-string:not(a) {
          color: rgb(${text}) !important;
        }
  
        yt-live-chat-app ::-webkit-scrollbar-thumb {
          background: rgba(${text}, 0.68);
        }
  
        yt-live-chat-app ::-webkit-scrollbar-thumb:hover {
          background: rgba(${text}, 0.38);
        }

        /* Watch page > Live chat > Top Fans section */
        .ytvlLiveLeaderboardItemViewModelRankNumber,
        .ytvlLiveLeaderboardItemChannelContentViewModelChannelName {
          color: rgb(${text}) !important;
        }

        .ytvlLiveLeaderboardItemViewModelPoints,
        .ytvlLiveLeaderboardItemActionContentViewModelActionDescription {
          color: rgba(${text}, 0.68);
        }

        /* Watch page > Live chat > Buttons */
        yt-live-chat-membership-item-renderer {
          --yt-live-chat-footer-button-text-color: rgb(${black || white || bg});
          --yt-live-chat-footer-button-text-background-color: rgb(${accent});
        }
    
        yt-live-chat-toast-renderer .yt-spec-button-shape-next--call-to-action-inverse.yt-spec-button-shape-next--text {
          color: rgb(${accent});
        }
    
        yt-live-chat-toast-renderer .yt-spec-button-shape-next--call-to-action-inverse.yt-spec-button-shape-next--text:hover {
          background: rgba(${accent}, 0.3);
        }
  
        /* Watch page > "In this video" box */
        .ytwTimelineChapterViewModelHost {
          background: rgb(${bg});
        }
  
        .ytwTimelineItemViewModelTimestamp {
          color: rgba(${text}, 0.38);
          background: rgba(${btn}, ${btnOpacity || '0.10'});
        }
  
        .ytwTimelineItemViewModelTimestampActive {
          background: rgb(${accent});
          color: rgb(${black || white || bg});
        }
  
        .ytwTranscriptSegmentViewModelHost {
          color: rgba(${text}, 0.38);
        }
  
        .shelf-header-layout__title,
        .ytwTranscriptSegmentViewModelHostActive,
        .ytwTimelineChapterViewModelTitle {
          color: rgb(${text});
        }

        /* Watch page > Comment section > Author badge */
        ytd-author-comment-badge-renderer[creator] {
          --ytd-author-comment-badge-background-color: rgb(${accent}) !important;
          --ytd-author-comment-badge-name-color: rgb(${black || white || bg}) !important;
          --ytd-author-comment-badge-icon-color: rgb(${black || white || bg}) !important;
        }

        /* Watch page > Comment section > Author heart */
        #hearted.ytd-creator-heart-renderer {
          color: ${red};
        }

        /* Watch page > Comment section > Profile preview */
        .ytProfileCardViewModelHost {
          background: ${btnSolid};
        }

        /* Watch page > Comment section > Reddit style */
        ytd-comment-thread-renderer[thread-hovered]>#comment-container.ytd-comment-thread-renderer .continuation.ytd-comment-thread-renderer,
        .ytSubThreadHovered>.ytSubThreadThreadline .ytSubThreadConnection, 
        .ytSubThreadHovered>.ytSubThreadThreadline .ytSubThreadContinuation {
          border-color: rgb(${accent});
        }
          
        /* Watch page > Clip creation scrubber view */
        .handle-grip.yt-clip-creation-scrubber-view {
          background: rgb(${black || white || bg});
        }
  
        /* Watch page > End cards */
        .ytp-ce-expanding-overlay-background,
        .yt-ui-ellipsis {
          background: rgb(${bg});
        }
  
        .ytp-ce-channel-this .ytp-ce-channel-metadata {
          border-top: 1px solid rgba(${btn}, ${btnHoverOpacity || '0.20'});
          color: rgba(${text}, 0.68);
        }
  
        .ytp-sb-subscribe,
        a.ytp-sb-subscribe {
          background: rgb(${accent});
          color: rgb(${black || white || bg});
        }
  
        .ytp-sb-unsubscribe {
          background: rgba(${btn}, ${btnOpacity || '0.10'});
          color: rgb(${text});
        }
  
        a.ytp-ce-link,
        a.ytp-ce-link:hover,
        a.ytp-ce-link:visited {
          color: rgb(${accent}) !important;
        }
  
        .ytp-ce-website-metadata,
        .ytp-ce-merchandise-metadata,
        .ytp-ce-merchandise-price-container,
        .ytp-ce-channel-subscribers-text,
        .ytp-ce-channel-metadata {
          color: rgba(${text}, 0.68);
        }
  
        .ytp-ce-website-title,
        .ytp-ce-merchandise-title {
          color: rgb(${text});
        }
  
        .ytp-exp-ppp-update .ytp-paid-content-overlay-link,
        #avatar.ytd-watch-card-rich-header-renderer {
          border-color: rgb(${accent});
        }
  
        /* Watch page > Thanks slider container */
        #sliderBar.tp-yt-paper-slider {
          --paper-slider-container-color: rgba(${btn}, ${btnOpacity || '0.10'});
        }

        /* Watch page > Description > How this content was made */
        .ytwHowThisWasMadeSectionViewModelSectionTitle,
        .ytwHowThisWasMadeSectionViewModelBodyHeader {
          color: rgb(${text});
        }

        .ytwHowThisWasMadeSectionViewModelBodyText {
          color: rgba(${text}, 0.68);
        }

        /* Shorts page > Tree-dots menu > Dropdown menu button */
        .yt-list-item-view-model {
          color: rgb(${text});
        }

        /* Shorts page > Tree-dots menu > Dropdown menu button > Selected option text */
        .yt-list-item-view-model__selection-text {
          color: rgba(${text}, 0.68);
        }
        `;
    }
});