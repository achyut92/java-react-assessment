import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Sort {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size of array (2 to 10000): \n");
        int n = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            System.out.println("Enter value(all value must be distinct)");
            arr[i] = sc.nextInt();
        }
        sc.close();
        Sort s = new Sort();
        int[] a = new int[] { 2, 6, 5, 4, 3 };
        s.sort(n, arr);
    }

    public void sort(int size, int[] array) {
        if (size != array.length) {
            System.err.println("Size of array mis-match");
        } else {
            Map<Integer, Integer> map = new LinkedHashMap<Integer, Integer>();
            int i = 1;
            for (int var : array) {
                map.put(var, i);
                i++;
            }
            int[] sortedAr = array.clone();
            Arrays.sort(sortedAr);
            if (isEqual(array, sortedAr)) {
                System.out.println("Yes");
            } else {
                int noOfSwaps = 0;
                int[] swapedIndex = new int[size];
                int[] targetIndex = new int[size];
                for (int j = 0; j < size; j++) {
                    if (map.get(sortedAr[j]) != j + 1) {
                        swapedIndex[noOfSwaps] = map.get(sortedAr[j]);
                        targetIndex[noOfSwaps] = j + 1;
                        noOfSwaps++;
                    }
                }
                if (noOfSwaps == 2) {
                    System.out.println("Yes, Swap " + targetIndex[0] + "," + targetIndex[1]);
                } else if (noOfSwaps > 2) {
                    targetIndex = Arrays.copyOfRange(targetIndex, 0, noOfSwaps);
                    swapedIndex = Arrays.copyOfRange(swapedIndex, 0, noOfSwaps);
                    if (isEqual(targetIndex, reverse(swapedIndex))) {
                        System.out.println("Yes, reverse " + targetIndex[0] + " " + targetIndex[noOfSwaps - 1]);
                    } else {
                        System.out.println("No");
                    }
                }
            }
        }
    }

    private boolean isEqual(int[] index, int[] target) {
        for (int i = 0; i < index.length; i++) {
            if (index[i] > 0) {
                if (index[i] != target[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    private int[] reverse(int[] arr) {
        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - i - 1];
            arr[arr.length - i - 1] = temp;
        }
        return arr;
    }
}