package opp;


import org.openqa.selenium.*;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class Selenium {

    public static void main(String[] args) {
/*
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\Firefox WebDriver\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
*/
        /*
        if(testLogInKonf()){
            System.out.println("Test passed");
        } else {
            System.out.println("Test failed");
        }


        if(testLogInKorisnik()){
            System.out.println("Test passed");
        } else {
            System.out.println("Test failed");
        }

        if(addKonf()){
            System.out.println("Test passed");
        } else {
            System.out.println("Test failed");
        }
        */

        if(testRegKorisnik()){
            System.out.println("Test passed");
        } else {
            System.out.println("Test failed");
        }

    }

    private static boolean testRegKorisnik() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\Firefox WebDriver\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("localhost:3000/");

        WebElement element3 = driver.findElement(By.className("dropdown-toggle"));
        element3.click();

        WebElement submitButton = driver.findElement(By.id("registerButton"));
        submitButton.click();

        WebElement imeInput = driver.findElement(By.id("ime"));
        imeInput.sendKeys("Vaše ime");

        WebElement prezimeInput = driver.findElement(By.id("prezime"));
        prezimeInput.sendKeys("Vaše prezime");

        WebElement emailInput = driver.findElement(By.id("Email"));
        emailInput.sendKeys("vaš_email5@example.com");

        WebElement lozinkaInput = driver.findElement(By.id("password"));
        lozinkaInput.sendKeys("Pa$$w0rd");

        WebElement potvrdaLozinkeInput = driver.findElement(By.id("confirmPassword"));
        potvrdaLozinkeInput.sendKeys("Pa$$w0rd");

        // Kliknite na gumb za registraciju submit-button
        WebElement regclick = driver.findElement(By.className("submit-button"));
        regclick.click();

        regclick.click();


        /*
        JavascriptExecutor js = (JavascriptExecutor)driver;
        js.executeScript("arguments[0].click()", regclick);

         */

        String redirURL = driver.getCurrentUrl();

        System.out.println("Current URL is: " + redirURL );
        driver.quit();
        if(redirURL.equals("http://localhost:3000/"))

            return true;
        else
            return false;


    }

    private static boolean addKonf() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\Firefox WebDriver\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("localhost:3000/");

        WebElement element3 = driver.findElement(By.className("dropdown-toggle"));
        element3.click();

        WebElement submitButton = driver.findElement(By.id("loginButton"));
        submitButton.click();

        WebElement element = driver.findElement(By.className("input-field"));
        element.sendKeys("ivana@horvat.hr");

        WebElement element2 = driver.findElement(By.id("password"));
        element2.sendKeys("Pa$$w0rd");

        WebElement submitButton2 = driver.findElement(By.className("submit-button"));
        submitButton2.click();

        WebElement imeField = driver.findElement(By.name("ime"));
        imeField.sendKeys("Naziv konferencije");

        WebElement startTimeField = driver.findElement(By.name("startTime"));
        startTimeField.sendKeys("2024-01-20T10:00");

        WebElement endTimeField = driver.findElement(By.name("endTime"));
        endTimeField.sendKeys("2024-01-21T18:00");

        WebElement passwordField = driver.findElement(By.name("password"));
        passwordField.sendKeys("tajnaLozinka");

        WebElement liveLinkField = driver.findElement(By.name("liveLink"));
        liveLinkField.sendKeys("http://www.live-link.com");

        WebElement locationField = driver.findElement(By.name("location"));
        locationField.sendKeys("Zagreb");

        WebElement streetField = driver.findElement(By.name("street"));
        streetField.sendKeys("Unska");

        WebElement streetNumberField = driver.findElement(By.name("streetNumber"));
        streetNumberField.sendKeys("3");

        WebElement pbrField = driver.findElement(By.name("pbr"));
        pbrField.sendKeys("10000");

        // Klik na dugme "Dodaj"
        WebElement dodajkonficgumbic = driver.findElement(By.id("dodajKonf"));
        dodajkonficgumbic.click();

        dodajkonficgumbic.click();

        String redirURL = driver.getCurrentUrl();

        System.out.println("Current URL is: " + redirURL );
        driver.quit();
        if(redirURL.contains("admin"))

            return true;
        else
            return false;



    }

    private static boolean testLogInKorisnik() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\Firefox WebDriver\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("localhost:3000/");

        WebElement element3 = driver.findElement(By.className("dropdown-toggle"));
        element3.click();

        WebElement submitButton = driver.findElement(By.id("loginButton"));
        submitButton.click();

        WebElement element = driver.findElement(By.className("input-field"));
        element.sendKeys("ivana@horvat.hr");

        WebElement element2 = driver.findElement(By.id("password"));
        element2.sendKeys("Pa$$w0rd");

        WebElement submitButton2 = driver.findElement(By.className("submit-button"));
        submitButton2.click();

        String redirURL = driver.getCurrentUrl();

        System.out.println("Current URL is: " + redirURL );
        driver.quit();
        if(redirURL.contains("admin"))

            return true;
        else
            return false;

    }


    @Test
    public static boolean testLogInKonf() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\Firefox WebDriver\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://poster-rangers-fe.onrender.com/");


        WebElement element = driver.findElement(By.className("codeInput"));
        element.sendKeys("123");
        WebElement submitButton = driver.findElement(By.className("submitButton"));
        submitButton.click();

        String redirURL = driver.getCurrentUrl();


        // Check the title of the page
        System.out.println("Current URL is: " + redirURL );
        driver.quit();
        if(redirURL.contains("home"))

            return true;
        else
            return false;

    }
}
