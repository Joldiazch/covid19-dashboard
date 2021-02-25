import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from '../../components/Chart';
import Recovereds from '../../components/Recovereds';
import Orders from '../../components/Orders';
import { authenticationService } from '../../services/authentication.service';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 480,
  },
}));

export default function DashboardCountry() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [options, setOptions] = useState([]);
  const [countrySelected, setCountrySelected] = useState(countries[0]);
  const [inputValue, setInputValue] = useState('Colombia');
  let history = useHistory();

  useEffect(() => {
    setOptions(countries);
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleExitToApp = async () => {
    await authenticationService.logout();
    history.push("/login/");
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const currentUser = authenticationService.currentUserValue;
  if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Covid19 Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => handleExitToApp()}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Autocomplete
            id="autocomplete-box"
            options={options}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
            value={countrySelected}
            onChange={(event, newValue) => {
              setCountrySelected(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <Recovereds />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

const countries = [
  {
    "name": "Colombia",
    "alpha2code": "CO",
    "alpha3code": "COL",
    "latitude": 4.570868,
    "longitude": -74.297333
  },
  {
    "name": "Afghanistan",
    "alpha2code": "AF",
    "alpha3code": "AFG",
    "latitude": 33.93911,
    "longitude": 67.709953
  },
  {
    "name": "Åland Islands",
    "alpha2code": "AX",
    "alpha3code": "ALA",
    "latitude": 60.1995487,
    "longitude": 20.3711715
  },
  {
    "name": "Albania",
    "alpha2code": "AL",
    "alpha3code": "ALB",
    "latitude": 41.153332,
    "longitude": 20.168331
  },
  {
    "name": "Algeria",
    "alpha2code": "DZ",
    "alpha3code": "DZA",
    "latitude": 28.033886,
    "longitude": 1.659626
  },
  {
    "name": "American Samoa",
    "alpha2code": "AS",
    "alpha3code": "ASM",
    "latitude": -14.270972,
    "longitude": -170.132217
  },
  {
    "name": "Andorra",
    "alpha2code": "AD",
    "alpha3code": "AND",
    "latitude": 42.546245,
    "longitude": 1.601554
  },
  {
    "name": "Angola",
    "alpha2code": "AO",
    "alpha3code": "AGO",
    "latitude": -11.202692,
    "longitude": 17.873887
  },
  {
    "name": "Anguilla",
    "alpha2code": "AI",
    "alpha3code": "AIA",
    "latitude": 18.220554,
    "longitude": -63.068615
  },
  {
    "name": "Antarctica",
    "alpha2code": "AQ",
    "alpha3code": "ATA",
    "latitude": -75.250973,
    "longitude": -0.071389
  },
  {
    "name": "Antigua and Barbuda",
    "alpha2code": "AG",
    "alpha3code": "ATG",
    "latitude": 17.060816,
    "longitude": -61.796428
  },
  {
    "name": "Argentina",
    "alpha2code": "AR",
    "alpha3code": "ARG",
    "latitude": -38.416097,
    "longitude": -63.616672
  },
  {
    "name": "Armenia",
    "alpha2code": "AM",
    "alpha3code": "ARM",
    "latitude": 40.069099,
    "longitude": 45.038189
  },
  {
    "name": "Aruba",
    "alpha2code": "AW",
    "alpha3code": "ABW",
    "latitude": 12.52111,
    "longitude": -69.968338
  },
  {
    "name": "Australia",
    "alpha2code": "AU",
    "alpha3code": "AUS",
    "latitude": -25.274398,
    "longitude": 133.775136
  },
  {
    "name": "Austria",
    "alpha2code": "AT",
    "alpha3code": "AUT",
    "latitude": 47.516231,
    "longitude": 14.550072
  },
  {
    "name": "Azerbaijan",
    "alpha2code": "AZ",
    "alpha3code": "AZE",
    "latitude": 40.143105,
    "longitude": 47.576927
  },
  {
    "name": "Bahamas",
    "alpha2code": "BS",
    "alpha3code": "BHS",
    "latitude": 25.03428,
    "longitude": -77.39628
  },
  {
    "name": "Bahrain",
    "alpha2code": "BH",
    "alpha3code": "BHR",
    "latitude": 25.930414,
    "longitude": 50.637772
  },
  {
    "name": "Bangladesh",
    "alpha2code": "BD",
    "alpha3code": "BGD",
    "latitude": 23.684994,
    "longitude": 90.356331
  },
  {
    "name": "Barbados",
    "alpha2code": "BB",
    "alpha3code": "BRB",
    "latitude": 13.193887,
    "longitude": -59.543198
  },
  {
    "name": "Belarus",
    "alpha2code": "BY",
    "alpha3code": "BLR",
    "latitude": 53.709807,
    "longitude": 27.953389
  },
  {
    "name": "Belgium",
    "alpha2code": "BE",
    "alpha3code": "BEL",
    "latitude": 50.503887,
    "longitude": 4.469936
  },
  {
    "name": "Belize",
    "alpha2code": "BZ",
    "alpha3code": "BLZ",
    "latitude": 17.189877,
    "longitude": -88.49765
  },
  {
    "name": "Benin",
    "alpha2code": "BJ",
    "alpha3code": "BEN",
    "latitude": 9.30769,
    "longitude": 2.315834
  },
  {
    "name": "Bermuda",
    "alpha2code": "BM",
    "alpha3code": "BMU",
    "latitude": 32.321384,
    "longitude": -64.75737
  },
  {
    "name": "Bhutan",
    "alpha2code": "BT",
    "alpha3code": "BTN",
    "latitude": 27.514162,
    "longitude": 90.433601
  },
  {
    "name": "Bolivia",
    "alpha2code": "BO",
    "alpha3code": "BOL",
    "latitude": -16.290154,
    "longitude": -63.588653
  },
  {
    "name": "Bonaire, Sint Eustatius and Saba",
    "alpha2code": "BQ",
    "alpha3code": "BES",
    "latitude": 12.1683718,
    "longitude": -68.308183
  },
  {
    "name": "Bosnia and Herzegovina",
    "alpha2code": "BA",
    "alpha3code": "BIH",
    "latitude": 43.915886,
    "longitude": 17.679076
  },
  {
    "name": "Botswana",
    "alpha2code": "BW",
    "alpha3code": "BWA",
    "latitude": -22.328474,
    "longitude": 24.684866
  },
  {
    "name": "Bouvet Island",
    "alpha2code": "BV",
    "alpha3code": "BVT",
    "latitude": -54.423199,
    "longitude": 3.413194
  },
  {
    "name": "Brazil",
    "alpha2code": "BR",
    "alpha3code": "BRA",
    "latitude": -14.235004,
    "longitude": -51.92528
  },
  {
    "name": "British Indian Ocean Territory",
    "alpha2code": "IO",
    "alpha3code": "IOT",
    "latitude": -6.343194,
    "longitude": 71.876519
  },
  {
    "name": "British Virgin Islands",
    "alpha2code": "VG",
    "alpha3code": "VGB",
    "latitude": 18.420695,
    "longitude": -64.639968
  },
  {
    "name": "Brunei",
    "alpha2code": "BN",
    "alpha3code": "BRN",
    "latitude": 4.535277,
    "longitude": 114.727669
  },
  {
    "name": "Bulgaria",
    "alpha2code": "BG",
    "alpha3code": "BGR",
    "latitude": 42.733883,
    "longitude": 25.48583
  },
  {
    "name": "Burkina Faso",
    "alpha2code": "BF",
    "alpha3code": "BFA",
    "latitude": 12.238333,
    "longitude": -1.561593
  },
  {
    "name": "Burundi",
    "alpha2code": "BI",
    "alpha3code": "BDI",
    "latitude": -3.373056,
    "longitude": 29.918886
  },
  {
    "name": "Cabo Verde",
    "alpha2code": "CV",
    "alpha3code": "CPV",
    "latitude": 16.002082,
    "longitude": -24.013197
  },
  {
    "name": "Cambodia",
    "alpha2code": "KH",
    "alpha3code": "KHM",
    "latitude": 12.565679,
    "longitude": 104.990963
  },
  {
    "name": "Cameroon",
    "alpha2code": "CM",
    "alpha3code": "CMR",
    "latitude": 7.369722,
    "longitude": 12.354722
  },
  {
    "name": "Canada",
    "alpha2code": "CA",
    "alpha3code": "CAN",
    "latitude": 56.130366,
    "longitude": -106.346771
  },
  {
    "name": "CAR",
    "alpha2code": "CF",
    "alpha3code": "CAF",
    "latitude": 6.611111,
    "longitude": 20.939444
  },
  {
    "name": "Cayman Islands",
    "alpha2code": "KY",
    "alpha3code": "CYM",
    "latitude": 19.513469,
    "longitude": -80.566956
  },
  {
    "name": "Chad",
    "alpha2code": "TD",
    "alpha3code": "TCD",
    "latitude": 15.454166,
    "longitude": 18.732207
  },
  {
    "name": "Channel Islands",
    "alpha2code": null,
    "alpha3code": null,
    "latitude": 49.372284,
    "longitude": -2.364351
  },
  {
    "name": "Chile",
    "alpha2code": "CL",
    "alpha3code": "CHL",
    "latitude": -35.675147,
    "longitude": -71.542969
  },
  {
    "name": "China",
    "alpha2code": "CN",
    "alpha3code": "CHN",
    "latitude": 35.86166,
    "longitude": 104.195397
  },
  {
    "name": "Christmas Island",
    "alpha2code": "CX",
    "alpha3code": "CXR",
    "latitude": -10.447525,
    "longitude": 105.690449
  },
  {
    "name": "Cocos (Keeling) Islands",
    "alpha2code": "CC",
    "alpha3code": "CCK",
    "latitude": -12.164165,
    "longitude": 96.870956
  },
  {
    "name": "Comoros",
    "alpha2code": "KM",
    "alpha3code": "COM",
    "latitude": -11.875001,
    "longitude": 43.872219
  },
  {
    "name": "Congo",
    "alpha2code": "CG",
    "alpha3code": "COG",
    "latitude": -0.228021,
    "longitude": 15.827659
  },
  {
    "name": "Cook Islands",
    "alpha2code": "CK",
    "alpha3code": "COK",
    "latitude": -21.236736,
    "longitude": -159.777671
  },
  {
    "name": "Costa Rica",
    "alpha2code": "CR",
    "alpha3code": "CRI",
    "latitude": 9.748917,
    "longitude": -83.753428
  },
  {
    "name": "Croatia",
    "alpha2code": "HR",
    "alpha3code": "HRV",
    "latitude": 45.1,
    "longitude": 15.2
  },
  {
    "name": "Cuba",
    "alpha2code": "CU",
    "alpha3code": "CUB",
    "latitude": 21.521757,
    "longitude": -77.781167
  },
  {
    "name": "Curaçao",
    "alpha2code": "CW",
    "alpha3code": "CUW",
    "latitude": 12.16957,
    "longitude": -68.990021
  },
  {
    "name": "Cyprus",
    "alpha2code": "CY",
    "alpha3code": "CYP",
    "latitude": 35.126413,
    "longitude": 33.429859
  },
  {
    "name": "Czech Republic",
    "alpha2code": "CZ",
    "alpha3code": "CZE",
    "latitude": 49.817492,
    "longitude": 15.472962
  },
  {
    "name": "Denmark",
    "alpha2code": "DK",
    "alpha3code": "DNK",
    "latitude": 56.26392,
    "longitude": 9.501785
  },
  {
    "name": "Diamond Princess",
    "alpha2code": null,
    "alpha3code": null,
    "latitude": null,
    "longitude": null
  },
  {
    "name": "Djibouti",
    "alpha2code": "DJ",
    "alpha3code": "DJI",
    "latitude": 11.825138,
    "longitude": 42.590275
  },
  {
    "name": "Dominica",
    "alpha2code": "DM",
    "alpha3code": "DMA",
    "latitude": 15.414999,
    "longitude": -61.370976
  },
  {
    "name": "Dominican Republic",
    "alpha2code": "DO",
    "alpha3code": "DOM",
    "latitude": 18.735693,
    "longitude": -70.162651
  },
  {
    "name": "DRC",
    "alpha2code": "CD",
    "alpha3code": "COD",
    "latitude": -4.038333,
    "longitude": 21.758664
  },
  {
    "name": "Ecuador",
    "alpha2code": "EC",
    "alpha3code": "ECU",
    "latitude": -1.831239,
    "longitude": -78.183406
  },
  {
    "name": "Egypt",
    "alpha2code": "EG",
    "alpha3code": "EGY",
    "latitude": 26.820553,
    "longitude": 30.802498
  },
  {
    "name": "El Salvador",
    "alpha2code": "SV",
    "alpha3code": "SLV",
    "latitude": 13.794185,
    "longitude": -88.89653
  },
  {
    "name": "Equatorial Guinea",
    "alpha2code": "GQ",
    "alpha3code": "GNQ",
    "latitude": 1.650801,
    "longitude": 10.267895
  },
  {
    "name": "Eritrea",
    "alpha2code": "ER",
    "alpha3code": "ERI",
    "latitude": 15.179384,
    "longitude": 39.782334
  },
  {
    "name": "Estonia",
    "alpha2code": "EE",
    "alpha3code": "EST",
    "latitude": 58.595272,
    "longitude": 25.013607
  },
  {
    "name": "Eswatini",
    "alpha2code": "SZ",
    "alpha3code": "SWZ",
    "latitude": -26.522503,
    "longitude": 31.465866
  },
  {
    "name": "Ethiopia",
    "alpha2code": "ET",
    "alpha3code": "ETH",
    "latitude": 9.145,
    "longitude": 40.489673
  },
  {
    "name": "Faeroe Islands",
    "alpha2code": "FO",
    "alpha3code": "FRO",
    "latitude": 61.892635,
    "longitude": -6.911806
  },
  {
    "name": "Falkland Islands",
    "alpha2code": "FK",
    "alpha3code": "FLK",
    "latitude": -51.796253,
    "longitude": -59.523613
  },
  {
    "name": "Fiji",
    "alpha2code": "FJ",
    "alpha3code": "FJI",
    "latitude": -16.578193,
    "longitude": 179.414413
  },
  {
    "name": "Finland",
    "alpha2code": "FI",
    "alpha3code": "FIN",
    "latitude": 61.92411,
    "longitude": 25.748151
  },
  {
    "name": "France",
    "alpha2code": "FR",
    "alpha3code": "FRA",
    "latitude": 46.227638,
    "longitude": 2.213749
  },
  {
    "name": "French Guiana",
    "alpha2code": "GF",
    "alpha3code": "GUF",
    "latitude": 3.933889,
    "longitude": -53.125782
  },
  {
    "name": "French Polynesia",
    "alpha2code": "PF",
    "alpha3code": "PYF",
    "latitude": -17.679742,
    "longitude": -149.406843
  },
  {
    "name": "French Southern Territories",
    "alpha2code": "TF",
    "alpha3code": "ATF",
    "latitude": -49.280366,
    "longitude": 69.348557
  },
  {
    "name": "Gabon",
    "alpha2code": "GA",
    "alpha3code": "GAB",
    "latitude": -0.803689,
    "longitude": 11.609444
  },
  {
    "name": "Gambia",
    "alpha2code": "GM",
    "alpha3code": "GMB",
    "latitude": 13.443182,
    "longitude": -15.310139
  },
  {
    "name": "Georgia",
    "alpha2code": "GE",
    "alpha3code": "GEO",
    "latitude": 42.315407,
    "longitude": 43.356892
  },
  {
    "name": "Germany",
    "alpha2code": "DE",
    "alpha3code": "DEU",
    "latitude": 51.165691,
    "longitude": 10.451526
  },
  {
    "name": "Ghana",
    "alpha2code": "GH",
    "alpha3code": "GHA",
    "latitude": 7.946527,
    "longitude": -1.023194
  },
  {
    "name": "Gibraltar",
    "alpha2code": "GI",
    "alpha3code": "GIB",
    "latitude": 36.137741,
    "longitude": -5.345374
  },
  {
    "name": "Greece",
    "alpha2code": "GR",
    "alpha3code": "GRC",
    "latitude": 39.074208,
    "longitude": 21.824312
  },
  {
    "name": "Greenland",
    "alpha2code": "GL",
    "alpha3code": "GRL",
    "latitude": 71.706936,
    "longitude": -42.604303
  },
  {
    "name": "Grenada",
    "alpha2code": "GD",
    "alpha3code": "GRD",
    "latitude": 12.262776,
    "longitude": -61.604171
  },
  {
    "name": "Guadeloupe",
    "alpha2code": "GP",
    "alpha3code": "GLP",
    "latitude": 16.995971,
    "longitude": -62.067641
  },
  {
    "name": "Guam",
    "alpha2code": "GU",
    "alpha3code": "GUM",
    "latitude": 13.444304,
    "longitude": 144.793731
  },
  {
    "name": "Guatemala",
    "alpha2code": "GT",
    "alpha3code": "GTM",
    "latitude": 15.783471,
    "longitude": -90.230759
  },
  {
    "name": "Guernsey",
    "alpha2code": "GG",
    "alpha3code": "GGY",
    "latitude": 49.465691,
    "longitude": -2.585278
  },
  {
    "name": "Guinea",
    "alpha2code": "GN",
    "alpha3code": "GIN",
    "latitude": 9.945587,
    "longitude": -9.696645
  },
  {
    "name": "Guinea-Bissau",
    "alpha2code": "GW",
    "alpha3code": "GNB",
    "latitude": 11.803749,
    "longitude": -15.180413
  },
  {
    "name": "Guyana",
    "alpha2code": "GY",
    "alpha3code": "GUY",
    "latitude": 4.860416,
    "longitude": -58.93018
  },
  {
    "name": "Haiti",
    "alpha2code": "HT",
    "alpha3code": "HTI",
    "latitude": 18.971187,
    "longitude": -72.285215
  },
  {
    "name": "Heard Island and Mcdonald Islands",
    "alpha2code": "HM",
    "alpha3code": "HMD",
    "latitude": -53.08181,
    "longitude": 73.504158
  },
  {
    "name": "Honduras",
    "alpha2code": "HN",
    "alpha3code": "HND",
    "latitude": 15.199999,
    "longitude": -86.241905
  },
  {
    "name": "Hong Kong",
    "alpha2code": "HK",
    "alpha3code": "HKG",
    "latitude": 22.396428,
    "longitude": 114.109497
  },
  {
    "name": "Hungary",
    "alpha2code": "HU",
    "alpha3code": "HUN",
    "latitude": 47.162494,
    "longitude": 19.503304
  },
  {
    "name": "Iceland",
    "alpha2code": "IS",
    "alpha3code": "ISL",
    "latitude": 64.963051,
    "longitude": -19.020835
  },
  {
    "name": "India",
    "alpha2code": "IN",
    "alpha3code": "IND",
    "latitude": 20.593684,
    "longitude": 78.96288
  },
  {
    "name": "Indonesia",
    "alpha2code": "ID",
    "alpha3code": "IDN",
    "latitude": -0.789275,
    "longitude": 113.921327
  },
  {
    "name": "Iran",
    "alpha2code": "IR",
    "alpha3code": "IRN",
    "latitude": 32.427908,
    "longitude": 53.688046
  },
  {
    "name": "Iraq",
    "alpha2code": "IQ",
    "alpha3code": "IRQ",
    "latitude": 33.223191,
    "longitude": 43.679291
  },
  {
    "name": "Ireland",
    "alpha2code": "IE",
    "alpha3code": "IRL",
    "latitude": 53.41291,
    "longitude": -8.24389
  },
  {
    "name": "Isle of Man",
    "alpha2code": "IM",
    "alpha3code": "IMN",
    "latitude": 54.236107,
    "longitude": -4.548056
  },
  {
    "name": "Israel",
    "alpha2code": "IL",
    "alpha3code": "ISR",
    "latitude": 31.046051,
    "longitude": 34.851612
  },
  {
    "name": "Italy",
    "alpha2code": "IT",
    "alpha3code": "ITA",
    "latitude": 41.87194,
    "longitude": 12.56738
  },
  {
    "name": "Ivory Coast",
    "alpha2code": "CI",
    "alpha3code": "CIV",
    "latitude": 7.539989,
    "longitude": -5.54708
  },
  {
    "name": "Jamaica",
    "alpha2code": "JM",
    "alpha3code": "JAM",
    "latitude": 18.109581,
    "longitude": -77.297508
  },
  {
    "name": "Japan",
    "alpha2code": "JP",
    "alpha3code": "JPN",
    "latitude": 36.204824,
    "longitude": 138.252924
  },
  {
    "name": "Jersey",
    "alpha2code": "JE",
    "alpha3code": "JEY",
    "latitude": 49.214439,
    "longitude": -2.13125
  },
  {
    "name": "Jordan",
    "alpha2code": "JO",
    "alpha3code": "JOR",
    "latitude": 30.585164,
    "longitude": 36.238414
  },
  {
    "name": "Kazakhstan",
    "alpha2code": "KZ",
    "alpha3code": "KAZ",
    "latitude": 48.019573,
    "longitude": 66.923684
  },
  {
    "name": "Kenya",
    "alpha2code": "KE",
    "alpha3code": "KEN",
    "latitude": -0.023559,
    "longitude": 37.906193
  },
  {
    "name": "Kiribati",
    "alpha2code": "KI",
    "alpha3code": "KIR",
    "latitude": -3.370417,
    "longitude": -168.734039
  },
  {
    "name": "Kosovo* (disputed teritory)",
    "alpha2code": null,
    "alpha3code": "XK",
    "latitude": 42.66394,
    "longitude": 21.09611
  },
  {
    "name": "Kuwait",
    "alpha2code": "KW",
    "alpha3code": "KWT",
    "latitude": 29.31166,
    "longitude": 47.481766
  },
  {
    "name": "Kyrgyzstan",
    "alpha2code": "KG",
    "alpha3code": "KGZ",
    "latitude": 41.20438,
    "longitude": 74.766098
  },
  {
    "name": "Laos",
    "alpha2code": "LA",
    "alpha3code": "LAO",
    "latitude": 19.85627,
    "longitude": 102.495496
  },
  {
    "name": "Latvia",
    "alpha2code": "LV",
    "alpha3code": "LVA",
    "latitude": 56.879635,
    "longitude": 24.603189
  },
  {
    "name": "Lebanon",
    "alpha2code": "LB",
    "alpha3code": "LBN",
    "latitude": 33.854721,
    "longitude": 35.862285
  },
  {
    "name": "Lesotho",
    "alpha2code": "LS",
    "alpha3code": "LSO",
    "latitude": -29.609988,
    "longitude": 28.233608
  },
  {
    "name": "Liberia",
    "alpha2code": "LR",
    "alpha3code": "LBR",
    "latitude": 6.428055,
    "longitude": -9.429499
  },
  {
    "name": "Libya",
    "alpha2code": "LY",
    "alpha3code": "LBY",
    "latitude": 26.3351,
    "longitude": 17.228331
  },
  {
    "name": "Liechtenstein",
    "alpha2code": "LI",
    "alpha3code": "LIE",
    "latitude": 47.166,
    "longitude": 9.555373
  },
  {
    "name": "Lithuania",
    "alpha2code": "LT",
    "alpha3code": "LTU",
    "latitude": 55.169438,
    "longitude": 23.881275
  },
  {
    "name": "Luxembourg",
    "alpha2code": "LU",
    "alpha3code": "LUX",
    "latitude": 49.815273,
    "longitude": 6.129583
  },
  {
    "name": "Macao",
    "alpha2code": "MO",
    "alpha3code": "MAC",
    "latitude": 22.198745,
    "longitude": 113.543873
  },
  {
    "name": "Madagascar",
    "alpha2code": "MG",
    "alpha3code": "MDG",
    "latitude": -18.766947,
    "longitude": 46.869107
  },
  {
    "name": "Malawi",
    "alpha2code": "MW",
    "alpha3code": "MWI",
    "latitude": -13.254308,
    "longitude": 34.301525
  },
  {
    "name": "Malaysia",
    "alpha2code": "MY",
    "alpha3code": "MYS",
    "latitude": 4.210484,
    "longitude": 101.975766
  },
  {
    "name": "Maldives",
    "alpha2code": "MV",
    "alpha3code": "MDV",
    "latitude": 3.202778,
    "longitude": 73.22068
  },
  {
    "name": "Mali",
    "alpha2code": "ML",
    "alpha3code": "MLI",
    "latitude": 17.570692,
    "longitude": -3.996166
  },
  {
    "name": "Malta",
    "alpha2code": "MT",
    "alpha3code": "MLT",
    "latitude": 35.937496,
    "longitude": 14.375416
  },
  {
    "name": "Marshall Islands",
    "alpha2code": "MH",
    "alpha3code": "MHL",
    "latitude": 7.131474,
    "longitude": 171.184478
  },
  {
    "name": "Martinique",
    "alpha2code": "MQ",
    "alpha3code": "MTQ",
    "latitude": 14.641528,
    "longitude": -61.024174
  },
  {
    "name": "Mauritania",
    "alpha2code": "MR",
    "alpha3code": "MRT",
    "latitude": 21.00789,
    "longitude": -10.940835
  },
  {
    "name": "Mauritius",
    "alpha2code": "MU",
    "alpha3code": "MUS",
    "latitude": -20.348404,
    "longitude": 57.552152
  },
  {
    "name": "Mayotte",
    "alpha2code": "YT",
    "alpha3code": "MYT",
    "latitude": -12.8275,
    "longitude": 45.166244
  },
  {
    "name": "Mexico",
    "alpha2code": "MX",
    "alpha3code": "MEX",
    "latitude": 23.634501,
    "longitude": -102.552784
  },
  {
    "name": "Micronesia",
    "alpha2code": "FM",
    "alpha3code": "FSM",
    "latitude": 7.425554,
    "longitude": 150.550812
  },
  {
    "name": "Moldova",
    "alpha2code": "MD",
    "alpha3code": "MDA",
    "latitude": 47.411631,
    "longitude": 28.369885
  },
  {
    "name": "Monaco",
    "alpha2code": "MC",
    "alpha3code": "MCO",
    "latitude": 43.750298,
    "longitude": 7.412841
  },
  {
    "name": "Mongolia",
    "alpha2code": "MN",
    "alpha3code": "MNG",
    "latitude": 46.862496,
    "longitude": 103.846656
  },
  {
    "name": "Montenegro",
    "alpha2code": "ME",
    "alpha3code": "MNE",
    "latitude": 42.708678,
    "longitude": 19.37439
  },
  {
    "name": "Montserrat",
    "alpha2code": "MS",
    "alpha3code": "MSR",
    "latitude": 16.742498,
    "longitude": -62.187366
  },
  {
    "name": "Morocco",
    "alpha2code": "MA",
    "alpha3code": "MAR",
    "latitude": 31.791702,
    "longitude": -7.09262
  },
  {
    "name": "Mozambique",
    "alpha2code": "MZ",
    "alpha3code": "MOZ",
    "latitude": -18.665695,
    "longitude": 35.529562
  },
  {
    "name": "MS Zaandam",
    "alpha2code": null,
    "alpha3code": null,
    "latitude": null,
    "longitude": null
  },
  {
    "name": "Myanmar",
    "alpha2code": "MM",
    "alpha3code": "MMR",
    "latitude": 21.913965,
    "longitude": 95.956223
  },
  {
    "name": "Namibia",
    "alpha2code": "NA",
    "alpha3code": "NAM",
    "latitude": -22.95764,
    "longitude": 18.49041
  },
  {
    "name": "Nauru",
    "alpha2code": "NR",
    "alpha3code": "NRU",
    "latitude": -0.522778,
    "longitude": 166.931503
  },
  {
    "name": "Nepal",
    "alpha2code": "NP",
    "alpha3code": "NPL",
    "latitude": 28.394857,
    "longitude": 84.124008
  },
  {
    "name": "Netherlands",
    "alpha2code": "NL",
    "alpha3code": "NLD",
    "latitude": 52.132633,
    "longitude": 5.291266
  },
  {
    "name": "New Caledonia",
    "alpha2code": "NC",
    "alpha3code": "NCL",
    "latitude": -20.904305,
    "longitude": 165.618042
  },
  {
    "name": "New Zealand",
    "alpha2code": "NZ",
    "alpha3code": "NZL",
    "latitude": -40.900557,
    "longitude": 174.885971
  },
  {
    "name": "Nicaragua",
    "alpha2code": "NI",
    "alpha3code": "NIC",
    "latitude": 12.865416,
    "longitude": -85.207229
  },
  {
    "name": "Niger",
    "alpha2code": "NE",
    "alpha3code": "NER",
    "latitude": 17.607789,
    "longitude": 8.081666
  },
  {
    "name": "Nigeria",
    "alpha2code": "NG",
    "alpha3code": "NGA",
    "latitude": 9.081999,
    "longitude": 8.675277
  },
  {
    "name": "Niue",
    "alpha2code": "NU",
    "alpha3code": "NIU",
    "latitude": -19.054445,
    "longitude": -169.867233
  },
  {
    "name": "Norfolk Island",
    "alpha2code": "NF",
    "alpha3code": "NFK",
    "latitude": -29.040835,
    "longitude": 167.954712
  },
  {
    "name": "North Korea",
    "alpha2code": "KP",
    "alpha3code": "PRK",
    "latitude": 40.339852,
    "longitude": 127.510093
  },
  {
    "name": "North Macedonia",
    "alpha2code": "MK",
    "alpha3code": "MKD",
    "latitude": 41.608635,
    "longitude": 21.745275
  },
  {
    "name": "Northern Mariana Islands",
    "alpha2code": "MP",
    "alpha3code": "MNP",
    "latitude": 17.33083,
    "longitude": 145.38469
  },
  {
    "name": "Norway",
    "alpha2code": "NO",
    "alpha3code": "NOR",
    "latitude": 60.472024,
    "longitude": 8.468946
  },
  {
    "name": "Oman",
    "alpha2code": "OM",
    "alpha3code": "OMN",
    "latitude": 21.512583,
    "longitude": 55.923255
  },
  {
    "name": "Pakistan",
    "alpha2code": "PK",
    "alpha3code": "PAK",
    "latitude": 30.375321,
    "longitude": 69.345116
  },
  {
    "name": "Palau",
    "alpha2code": "PW",
    "alpha3code": "PLW",
    "latitude": 7.51498,
    "longitude": 134.58252
  },
  {
    "name": "Palestine",
    "alpha2code": "PS",
    "alpha3code": "PSE",
    "latitude": 31.952162,
    "longitude": 35.233154
  },
  {
    "name": "Panama",
    "alpha2code": "PA",
    "alpha3code": "PAN",
    "latitude": 8.537981,
    "longitude": -80.782127
  },
  {
    "name": "Papua New Guinea",
    "alpha2code": "PG",
    "alpha3code": "PNG",
    "latitude": -6.314993,
    "longitude": 143.95555
  },
  {
    "name": "Paraguay",
    "alpha2code": "PY",
    "alpha3code": "PRY",
    "latitude": -23.442503,
    "longitude": -58.443832
  },
  {
    "name": "Peru",
    "alpha2code": "PE",
    "alpha3code": "PER",
    "latitude": -9.189967,
    "longitude": -75.015152
  },
  {
    "name": "Philippines",
    "alpha2code": "PH",
    "alpha3code": "PHL",
    "latitude": 12.879721,
    "longitude": 121.774017
  },
  {
    "name": "Pitcairn",
    "alpha2code": "PN",
    "alpha3code": "PCN",
    "latitude": -24.703615,
    "longitude": -127.439308
  },
  {
    "name": "Poland",
    "alpha2code": "PL",
    "alpha3code": "POL",
    "latitude": 51.919438,
    "longitude": 19.145136
  },
  {
    "name": "Portugal",
    "alpha2code": "PT",
    "alpha3code": "PRT",
    "latitude": 39.399872,
    "longitude": -8.224454
  },
  {
    "name": "Puerto Rico",
    "alpha2code": "PR",
    "alpha3code": "PRI",
    "latitude": 18.220833,
    "longitude": -66.590149
  },
  {
    "name": "Qatar",
    "alpha2code": "QA",
    "alpha3code": "QAT",
    "latitude": 25.354826,
    "longitude": 51.183884
  },
  {
    "name": "Reunion",
    "alpha2code": "RE",
    "alpha3code": "REU",
    "latitude": -21.115141,
    "longitude": 55.536384
  },
  {
    "name": "Romania",
    "alpha2code": "RO",
    "alpha3code": "ROU",
    "latitude": 45.943161,
    "longitude": 24.96676
  },
  {
    "name": "Russia",
    "alpha2code": "RU",
    "alpha3code": "RUS",
    "latitude": 61.52401,
    "longitude": 105.318756
  },
  {
    "name": "Rwanda",
    "alpha2code": "RW",
    "alpha3code": "RWA",
    "latitude": -1.940278,
    "longitude": 29.873888
  },
  {
    "name": "Saint Barthélemy",
    "alpha2code": "BL",
    "alpha3code": "BLM",
    "latitude": 17.9139222,
    "longitude": -62.8338521
  },
  {
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "alpha2code": "SH",
    "alpha3code": "SHN",
    "latitude": -24.143474,
    "longitude": -10.030696
  },
  {
    "name": "Saint Kitts and Nevis",
    "alpha2code": "KN",
    "alpha3code": "KNA",
    "latitude": 17.357822,
    "longitude": -62.782998
  },
  {
    "name": "Saint Lucia",
    "alpha2code": "LC",
    "alpha3code": "LCA",
    "latitude": 13.909444,
    "longitude": -60.978893
  },
  {
    "name": "Saint Martin",
    "alpha2code": "MF",
    "alpha3code": "MAF",
    "latitude": 18.075277,
    "longitude": -63.060001
  },
  {
    "name": "Saint Pierre and Miquelon",
    "alpha2code": "PM",
    "alpha3code": "SPM",
    "latitude": 46.941936,
    "longitude": -56.27111
  },
  {
    "name": "Samoa",
    "alpha2code": "WS",
    "alpha3code": "WSM",
    "latitude": -13.759029,
    "longitude": -172.104629
  },
  {
    "name": "San Marino",
    "alpha2code": "SM",
    "alpha3code": "SMR",
    "latitude": 43.94236,
    "longitude": 12.457777
  },
  {
    "name": "Sao Tome and Principe",
    "alpha2code": "ST",
    "alpha3code": "STP",
    "latitude": 0.18636,
    "longitude": 6.613081
  },
  {
    "name": "Saudi Arabia",
    "alpha2code": "SA",
    "alpha3code": "SAU",
    "latitude": 23.885942,
    "longitude": 45.079162
  },
  {
    "name": "Senegal",
    "alpha2code": "SN",
    "alpha3code": "SEN",
    "latitude": 14.497401,
    "longitude": -14.452362
  },
  {
    "name": "Serbia",
    "alpha2code": "RS",
    "alpha3code": "SRB",
    "latitude": 44.016521,
    "longitude": 21.005859
  },
  {
    "name": "Seychelles",
    "alpha2code": "SC",
    "alpha3code": "SYC",
    "latitude": -4.679574,
    "longitude": 55.491977
  },
  {
    "name": "Sierra Leone",
    "alpha2code": "SL",
    "alpha3code": "SLE",
    "latitude": 8.460555,
    "longitude": -11.779889
  },
  {
    "name": "Singapore",
    "alpha2code": "SG",
    "alpha3code": "SGP",
    "latitude": 1.352083,
    "longitude": 103.819836
  },
  {
    "name": "Sint Maarten",
    "alpha2code": "SX",
    "alpha3code": "SXM",
    "latitude": 18.0347188,
    "longitude": -63.0681114
  },
  {
    "name": "Slovakia",
    "alpha2code": "SK",
    "alpha3code": "SVK",
    "latitude": 48.669026,
    "longitude": 19.699024
  },
  {
    "name": "Slovenia",
    "alpha2code": "SI",
    "alpha3code": "SVN",
    "latitude": 46.151241,
    "longitude": 14.995463
  },
  {
    "name": "Solomon Islands",
    "alpha2code": "SB",
    "alpha3code": "SLB",
    "latitude": -9.64571,
    "longitude": 160.156194
  },
  {
    "name": "Somalia",
    "alpha2code": "SO",
    "alpha3code": "SOM",
    "latitude": 5.152149,
    "longitude": 46.199616
  },
  {
    "name": "South Africa",
    "alpha2code": "ZA",
    "alpha3code": "ZAF",
    "latitude": -30.559482,
    "longitude": 22.937506
  },
  {
    "name": "South Georgia and the South Sandwich Islands",
    "alpha2code": "GS",
    "alpha3code": "SGS",
    "latitude": -54.429579,
    "longitude": -36.587909
  },
  {
    "name": "South Korea",
    "alpha2code": "KR",
    "alpha3code": "KOR",
    "latitude": 35.907757,
    "longitude": 127.766922
  },
  {
    "name": "South Sudan",
    "alpha2code": "SS",
    "alpha3code": "SSD",
    "latitude": 7.8626845,
    "longitude": 29.6949232
  },
  {
    "name": "Spain",
    "alpha2code": "ES",
    "alpha3code": "ESP",
    "latitude": 40.463667,
    "longitude": -3.74922
  },
  {
    "name": "Sri Lanka",
    "alpha2code": "LK",
    "alpha3code": "LKA",
    "latitude": 7.873054,
    "longitude": 80.771797
  },
  {
    "name": "St. Vincent Grenadines",
    "alpha2code": "VC",
    "alpha3code": "VCT",
    "latitude": 12.984305,
    "longitude": -61.287228
  },
  {
    "name": "Sudan",
    "alpha2code": "SD",
    "alpha3code": "SDN",
    "latitude": 12.862807,
    "longitude": 30.217636
  },
  {
    "name": "Suriname",
    "alpha2code": "SR",
    "alpha3code": "SUR",
    "latitude": 3.919305,
    "longitude": -56.027783
  },
  {
    "name": "Svalbard and Jan Mayen",
    "alpha2code": "SJ",
    "alpha3code": "SJM",
    "latitude": 77.553604,
    "longitude": 23.670272
  },
  {
    "name": "Sweden",
    "alpha2code": "SE",
    "alpha3code": "SWE",
    "latitude": 60.128161,
    "longitude": 18.643501
  },
  {
    "name": "Switzerland",
    "alpha2code": "CH",
    "alpha3code": "CHE",
    "latitude": 46.818188,
    "longitude": 8.227512
  },
  {
    "name": "Syria",
    "alpha2code": "SY",
    "alpha3code": "SYR",
    "latitude": 34.802075,
    "longitude": 38.996815
  },
  {
    "name": "Taiwan",
    "alpha2code": "TW",
    "alpha3code": "TWN",
    "latitude": 23.69781,
    "longitude": 120.960515
  },
  {
    "name": "Tajikistan",
    "alpha2code": "TJ",
    "alpha3code": "TJK",
    "latitude": 38.861034,
    "longitude": 71.276093
  },
  {
    "name": "Tanzania",
    "alpha2code": "TZ",
    "alpha3code": "TZA",
    "latitude": -6.369028,
    "longitude": 34.888822
  },
  {
    "name": "Thailand",
    "alpha2code": "TH",
    "alpha3code": "THA",
    "latitude": 15.870032,
    "longitude": 100.992541
  },
  {
    "name": "Timor-Leste",
    "alpha2code": "TL",
    "alpha3code": "TLS",
    "latitude": -8.874217,
    "longitude": 125.727539
  },
  {
    "name": "Togo",
    "alpha2code": "TG",
    "alpha3code": "TGO",
    "latitude": 8.619543,
    "longitude": 0.824782
  },
  {
    "name": "Tokelau",
    "alpha2code": "TK",
    "alpha3code": "TKL",
    "latitude": -8.967363,
    "longitude": -171.855881
  },
  {
    "name": "Tonga",
    "alpha2code": "TO",
    "alpha3code": "TON",
    "latitude": -21.178986,
    "longitude": -175.198242
  },
  {
    "name": "Trinidad and Tobago",
    "alpha2code": "TT",
    "alpha3code": "TTO",
    "latitude": 10.691803,
    "longitude": -61.222503
  },
  {
    "name": "Tunisia",
    "alpha2code": "TN",
    "alpha3code": "TUN",
    "latitude": 33.886917,
    "longitude": 9.537499
  },
  {
    "name": "Turkey",
    "alpha2code": "TR",
    "alpha3code": "TUR",
    "latitude": 38.963745,
    "longitude": 35.243322
  },
  {
    "name": "Turkmenistan",
    "alpha2code": "TM",
    "alpha3code": "TKM",
    "latitude": 38.969719,
    "longitude": 59.556278
  },
  {
    "name": "Turks and Caicos",
    "alpha2code": "TC",
    "alpha3code": "TCA",
    "latitude": 21.694025,
    "longitude": -71.797928
  },
  {
    "name": "Tuvalu",
    "alpha2code": "TV",
    "alpha3code": "TUV",
    "latitude": -7.109535,
    "longitude": 177.64933
  },
  {
    "name": "U.S. Virgin Islands",
    "alpha2code": "VI",
    "alpha3code": "VIR",
    "latitude": 18.335765,
    "longitude": -64.896335
  },
  {
    "name": "UAE",
    "alpha2code": "AE",
    "alpha3code": "ARE",
    "latitude": 23.424076,
    "longitude": 53.847818
  },
  {
    "name": "Uganda",
    "alpha2code": "UG",
    "alpha3code": "UGA",
    "latitude": 1.373333,
    "longitude": 32.290275
  },
  {
    "name": "UK",
    "alpha2code": "GB",
    "alpha3code": "GBR",
    "latitude": 55.378051,
    "longitude": -3.435973
  },
  {
    "name": "Ukraine",
    "alpha2code": "UA",
    "alpha3code": "UKR",
    "latitude": 48.379433,
    "longitude": 31.16558
  },
  {
    "name": "United States Minor Outlying Islands",
    "alpha2code": "UM",
    "alpha3code": "UMI",
    "latitude": 19.295374,
    "longitude": 166.6280441
  },
  {
    "name": "Uruguay",
    "alpha2code": "UY",
    "alpha3code": "URY",
    "latitude": -32.522779,
    "longitude": -55.765835
  },
  {
    "name": "USA",
    "alpha2code": "US",
    "alpha3code": "USA",
    "latitude": 37.09024,
    "longitude": -95.712891
  },
  {
    "name": "Uzbekistan",
    "alpha2code": "UZ",
    "alpha3code": "UZB",
    "latitude": 41.377491,
    "longitude": 64.585262
  },
  {
    "name": "Vanuatu",
    "alpha2code": "VU",
    "alpha3code": "VUT",
    "latitude": -15.376706,
    "longitude": 166.959158
  },
  {
    "name": "Vatican City",
    "alpha2code": "VA",
    "alpha3code": "VAT",
    "latitude": 41.902916,
    "longitude": 12.453389
  },
  {
    "name": "Venezuela",
    "alpha2code": "VE",
    "alpha3code": "VEN",
    "latitude": 6.42375,
    "longitude": -66.58973
  },
  {
    "name": "Vietnam",
    "alpha2code": "VN",
    "alpha3code": "VNM",
    "latitude": 14.058324,
    "longitude": 108.277199
  },
  {
    "name": "Wallis and Futuna",
    "alpha2code": "WF",
    "alpha3code": "WLF",
    "latitude": -13.768752,
    "longitude": -177.156097
  },
  {
    "name": "Western Sahara",
    "alpha2code": "EH",
    "alpha3code": "ESH",
    "latitude": 24.215527,
    "longitude": -12.885834
  },
  {
    "name": "Yemen",
    "alpha2code": "YE",
    "alpha3code": "YEM",
    "latitude": 15.552727,
    "longitude": 48.516388
  },
  {
    "name": "Zambia",
    "alpha2code": "ZM",
    "alpha3code": "ZMB",
    "latitude": -13.133897,
    "longitude": 27.849332
  },
  {
    "name": "Zimbabwe",
    "alpha2code": "ZW",
    "alpha3code": "ZWE",
    "latitude": -19.015438,
    "longitude": 29.154857
  }
];
