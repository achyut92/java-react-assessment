import java.math.BigInteger;
import java.util.Scanner;

public class Fact {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number between 1 to 100: \n");
        int in = sc.nextInt();
        Fact f = new Fact();
        sc.close();
        System.out.println(f.factorial(in));
    }

    public BigInteger factorial(int n) {
        BigInteger fact = BigInteger.valueOf(1);
        for (int i = 1; i <= n; i++) {
            fact = fact.multiply(BigInteger.valueOf(i));
        }
        return fact;
    }

    
}