export const name = 'Manjunath H K'

export const title = 'Senior SDET'

export const headline = 'Senior SDET | API & UI Automation | Java · Python · Microservices'

export const githubUsername = 'manjunathk833'

export const bio =
  'Senior SDET specializing in API/UI Automation in Microservice Architecture using Java, Groovy, and Python — with 6 years of experience across Airlines, Online Consumer Services, and Media & Communication sectors. Passionate about building robust automation frameworks that cut release cycles and eliminate manual overhead.'

export const tagline = 'Building quality at scale — one automation framework at a time.'

export const stats = {
  yearsExperience: 6,
  automationFrameworks: 5,
  testCasesWritten: 1000,
}

export const roles = [
  'Senior SDET',
  'Test Automation Engineer',
  'Quality Champion',
  'API Automation Specialist',
  'MAANG Aspirant',
]

export const skillsByCategory = {
  'API Automation': ['Java', 'Rest Assured', 'Ready API', 'SOAP', 'Groovy', 'TestNG', 'Cucumber', 'BDD', 'Postman', 'Allure'],
  'UI Automation': ['Selenium', 'Appium', 'Python'],
  'CI/CD & Cloud': ['Jenkins', 'GCP', 'TeamCity', 'Harness', 'Docker', 'Azure DevOps'],
  'Tools & Databases': ['Git', 'GitHub', 'Jira', 'Zephyr', 'Postgres SQL', 'IntelliJ', 'Charles Proxy', 'Burp Suite', 'Kibana'],
}

export const experience = [
  {
    company: 'Value Labs',
    role: 'Senior Engineer — Quality Engineering',
    location: 'Remote',
    duration: 'June 2023 – Present',
    bullets: [
      'Leveraged Agentic AI (AiDE) to accelerate test automation for the Order-Bags project, reducing automation implementation effort by 50% and test case drafting time by 75% across service-level and E2E validations.',
      'Developed multiple automation frameworks for PNR Linking and Special Service Requests in an airline project, automating 1000+ test cases using ReadyAPI and Rest Assured in Java — cutting effort from 750 to 50 man-hours.',
      'Streamlined test cycles using Azure DevOps, ReadyAPI, Rest Assured with BDD Cucumber, and AiDE for efficient test management.',
      'Automated Kibana log analysis, log issue reporting, and data quality validation pipelines — eliminating manual intervention and saving ~12 hours/week of QA overhead.',
    ],
  },
  {
    company: 'Dunzo',
    role: 'SDET-1',
    location: 'Bangalore',
    duration: 'Aug 2022 – June 2023',
    bullets: [
      'Automated end-to-end API flows and DB validations using the Ekam Java Framework for 4 key features, achieving 60% test coverage in a microservices-based Dunzo Merchant Service suite.',
      'Owned feature testing across the full SDLC from planning to deployment, ensuring high quality with minimal production bug leakage.',
      'Led root cause analysis of daily stability run failures using Allure reports, Google Metrics Explorer, and Kibana.',
    ],
  },
  {
    company: 'Tata Elxsi',
    role: 'Engineer → Senior Engineer, QA',
    location: 'Bangalore',
    duration: 'Dec 2019 – Aug 2022',
    bullets: [
      'Designed and implemented a fully automated BDD testing framework using Python, Appium, and TestRail API — automating ~50% of sanity tests and saving ~5 man-days/month.',
      'Contributed to a ₹100Cr OTT app project under Agile SDLC, enhancing iOS and Web platforms and directly boosting the iOS App Store rating from 1.9 to 3.5.',
      'Performed manual, domain API, Catch Media API, stability, and KPI testing for Web and iOS platforms using Charles Proxy, Postman, Burp Suite, Jira, and Zephyr.',
    ],
  },
]

export const education = [
  {
    institution: 'Sri Jayachamarajendra College of Engineering',
    degree: 'Bachelor of Engineering — Computer Science (Information Science)',
    grade: 'CGPA: 8.02/10',
    period: 'Aug 2015 – Mar 2019',
  },
]

export const certifications = [
  {
    title: 'ACE — Aide Agents Certified Engineer',
    issuer: 'Value Labs',
    date: 'December 2025',
    description: 'AI Agents certification for best practices and usage of AI Agents for Automation and STLC.',
  },
  {
    title: 'Python Beginner & Intermediate Training',
    issuer: 'Tata Elxsi',
    date: '2021',
  },
  {
    title: 'Selenium and Appium LinkedIn Learning Certification',
    issuer: 'LinkedIn Learning',
    date: '2021',
  },
]

export const awards = [
  {
    title: 'Employee of the Month',
    awarder: 'Value Labs',
    date: 'September 2025',
    description: 'For contributions in implementing best practices and utilization of AiDE.',
  },
  {
    title: 'Bravo Award',
    awarder: 'Tata Elxsi',
    date: 'January 2020',
    description: 'For contribution to the Web Platform as a Manual and API Test Engineer in the OTT Project.',
  },
]

export const testShowcase = [
  {
    id: 'bdd-api',
    title: 'BDD API Test',
    framework: 'Rest Assured + Cucumber',
    language: 'java',
    highlights: ['BDD Gherkin syntax', 'RestAssured assertions', 'Scenario context sharing'],
    description:
      'End-to-end booking API scenario using BDD Cucumber with Rest Assured. Validates request payload, response schema, and chains test data across steps.',
    code: `@When("I POST a new booking with valid details")
public void postNewBooking() {
    Map<String, Object> body = Map.of(
        "firstName",  "John",
        "lastName",   "Doe",
        "totalPrice", 150,
        "depositPaid", true,
        "bookingdates", Map.of(
            "checkin",  "2025-01-15",
            "checkout", "2025-01-20"
        )
    );

    response = given()
        .baseUri("https://restful-booker.herokuapp.com")
        .contentType(ContentType.JSON)
        .body(body)
    .when()
        .post("/booking")
    .then()
        .statusCode(200)
        .body("bookingid",        notNullValue())
        .body("booking.firstName", equalTo("John"))
        .extract().response();
}

@Then("the booking ID is stored for later use")
public void storeBookingId() {
    int id = response.jsonPath().getInt("bookingid");
    Assert.assertTrue(id > 0, "Booking ID must be a positive integer");
    ScenarioContext.set("BOOKING_ID", id);
}`,
  },
  {
    id: 'pom-selenium',
    title: 'Page Object Model',
    framework: 'Selenium + Python',
    language: 'python',
    highlights: ['Page Object pattern', 'Explicit waits', 'Fluent interface'],
    description:
      'Selenium UI automation with the Page Object Model pattern in Python. Uses explicit waits and a fluent interface to keep tests readable and maintenance-friendly.',
    code: `# pages/login_page.py
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginPage:
    EMAIL    = (By.ID, "email")
    PASSWORD = (By.ID, "password")
    SUBMIT   = (By.CSS_SELECTOR, "button[type='submit']")

    def __init__(self, driver):
        self.driver = driver
        self.wait   = WebDriverWait(driver, 10)

    def login(self, email: str, password: str) -> "DashboardPage":
        self.wait.until(EC.visibility_of_element_located(self.EMAIL))
        self.driver.find_element(*self.EMAIL).send_keys(email)
        self.driver.find_element(*self.PASSWORD).send_keys(password)
        self.driver.find_element(*self.SUBMIT).click()
        return DashboardPage(self.driver)

# tests/test_login.py
def test_valid_user_can_login(driver):
    dashboard = LoginPage(driver).login("user@example.com", "Pass@123")
    assert dashboard.is_loaded(), "Dashboard must render after successful login"`,
  },
  {
    id: 'parallel-testsng',
    title: 'Parallel Execution',
    framework: 'Selenium + TestNG',
    language: 'java',
    highlights: ['ThreadLocal WebDriver', 'Data-driven with @DataProvider', 'Parallel test matrix'],
    description:
      'Thread-safe parallel test execution using ThreadLocal<WebDriver> with TestNG. Runs 4 flight-search combinations concurrently without state leaking between threads.',
    code: `// BaseTest.java — thread-safe driver management
public class BaseTest {

    private static final ThreadLocal<WebDriver> driverThread = new ThreadLocal<>();

    @BeforeMethod
    public void setUp() {
        ChromeOptions opts = new ChromeOptions().addArguments("--headless=new");
        driverThread.set(new ChromeDriver(opts));
    }

    public static WebDriver getDriver() { return driverThread.get(); }

    @AfterMethod
    public void tearDown() {
        WebDriver d = driverThread.get();
        if (d != null) { d.quit(); driverThread.remove(); }
    }
}

// FlightSearchTest.java
public class FlightSearchTest extends BaseTest {

    @Test(dataProvider = "routes")
    public void searchFlight(String origin, String dest) {
        new SearchPage(getDriver())
            .search(origin, dest)
            .assertResultsLoaded();
    }

    @DataProvider(parallel = true)
    public Object[][] routes() {
        return new Object[][]{
            {"BLR", "DEL"}, {"BOM", "CCU"},
            {"HYD", "BLR"}, {"DEL", "BOM"}
        };
    }
}`,
  },
  {
    id: 'cicd-pipeline',
    title: 'CI/CD Pipeline',
    framework: 'GitHub Actions',
    language: 'yaml',
    highlights: ['Matrix strategy per suite', 'Nightly scheduled runs', 'Allure report artifacts'],
    description:
      'GitHub Actions workflow that triggers on PR and nightly schedule. Runs three test suites in parallel using a matrix strategy and uploads Allure results as artifacts.',
    code: `# .github/workflows/regression.yml
name: Regression Suite

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'   # Nightly at 02:00 UTC

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        suite: [booking, auth, search]
      fail-fast: false

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'

      - name: Run \${{ matrix.suite }} suite
        run: |
          mvn test -Dsurefire.suiteXmlFiles=suites/\${{ matrix.suite }}.xml

      - name: Upload Allure results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-\${{ matrix.suite }}
          path: target/allure-results`,
  },
]

export const socials = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/manjunath-h-k-ab30b1146/',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/manjunathk833',
    icon: 'github',
  },
  {
    label: 'Email',
    url: 'mailto:manjunathhk833@gmail.com',
    icon: 'mail',
  },
]
